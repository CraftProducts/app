import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { LoadFileAction } from '../+state/app.actions';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash-es';

@Component({
    selector: 'app-localspace',
    templateUrl: './localspace.component.html'
})
export class LocalSpaceComponent implements OnInit, OnDestroy {
    @Input() templateLoaded = false;
    @Input() loadedTemplate: any;

    @Input() filename = "";
    @Output() filenameChange = new EventEmitter<any>();
    
    @Output() reset = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();

    @Output() switchToGitspace = new EventEmitter<any>();

    

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    loadedFile$: Subscription;
    content: any;

    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
            .pipe(filter(file => file))
            .subscribe(file => {
                this.filename = (file.filename && file.filename.length > 0)
                    ? file.filename.split(".")[0]
                    : new Date().toISOString();

                this.filename = this.filename + '.json';
                this.content = (file.content) ? file.content : null;
            });

        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => {
                this.isModelDirty = p;
                if (this.isModelDirty && this.loadedTemplate && (!this.filename || this.filename.trim().length === 0)) {
                    this.filename = `${this.loadedTemplate.code}.json`;
                }
            });

    }
    ngOnDestroy(): void {
        this.loadedFile$ ? this.loadedFile$.unsubscribe() : null;
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
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

    filenameEditorVisible = false;
    toggleFilenameEditor = () => this.filenameEditorVisible = !this.filenameEditorVisible;

    canSave = () => this.isModelDirty &&
        this.filename && this.filename.trim().length > 0 && _.endsWith(this.filename.trim().toLowerCase(), '.json');

    onSave = () => {
        if (this.canSave()) {
            this.filenameChange.emit(this.filename);
            this.save.emit(this.content);
        }
    }
    onReset = () => this.reset.emit(this.content);
    onClose = () => this.close.emit(null);

    // onResetFile = (data) => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Reset, data }));
    // onCloseFile = () => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Close }));
    // onSaveFile = () => {
    //     this.store$.dispatch(new UserModelCommandAction({
    //         command: UserModelCommandTypes.Save,
    //         data: {
    //             filename: this.filename,
    //             saveLocation: SaveLocationTypes.LocalSpace
    //         }
    //     }));
    // }

    onSwitchToGitspace = () => this.switchToGitspace.emit(true);
}
