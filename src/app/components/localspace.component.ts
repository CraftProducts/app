import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SaveLocationTypes, UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';
import { LoadFileAction } from '../+state/app.actions';

@Component({
    selector: 'app-localspace',
    templateUrl: './localspace.component.html'
})
export class LocalSpaceComponent implements OnInit, OnDestroy {
    @Output() switchToGitspace = new EventEmitter<any>();

    loadedTemplate$: Subscription;
    loadedTemplate: any;
    templateLoaded = false;

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    filename = "";

    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }

    ngOnInit(): void {
        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => {
                this.isModelDirty = p;
                if (this.isModelDirty && this.loadedTemplate && (!this.filename || this.filename.trim().length === 0)) {
                    this.filename = `${this.loadedTemplate.code}.json`;
                }
            });

        this.loadedTemplate$ = this.store$.select(p => p.app.loadedTemplate)
            .subscribe(template => {
                if (!template) {
                    this.templateLoaded = false;
                    this.filename = "";
                } else {
                    this.templateLoaded = true;
                    this.loadedTemplate = template;
                }
            });
    }
    ngOnDestroy(): void {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
    }

    onFileLoaded(fileContent) {
        if (fileContent && fileContent.content) {
            this.filename = fileContent.filename;
            fileContent.type = 'data';
            fileContent.content = JSON.parse(fileContent.content);

            if (fileContent.content.isCustom &&
                !(this.loadedTemplate && this.loadedTemplate.isCustom && fileContent.content.templateCode === this.loadedTemplate.code)) {
                this.messageService.add({
                    severity: "error", life: 10000, closable: true,
                    summary: "Incompatible file",
                    detail: `The loaded file was crafted using custom template (${fileContent.content.templateCode}). First load the custom template and they retry opening this file.`
                });
                this.router.navigate(['/templates']);
            } else {
                this.store$.dispatch(new LoadFileAction(fileContent));
            }
        }
    }

    onFileLoadingError = (err) => this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })

    onResetFile = (data) => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Reset, data }));
    onCloseFile = () => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Close }));
    onSaveFile = () => {
        this.store$.dispatch(new UserModelCommandAction({
            command: UserModelCommandTypes.Save,
            data: {
                filename: this.filename,
                saveLocation: SaveLocationTypes.LocalSpace
            }
        }));
    }

    onSwitchToGitspace = () => this.switchToGitspace.emit(true);
}
