import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';
import { tap, filter } from 'rxjs/operators';
import { LoadFileAction } from '../+state/app.actions';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
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
                    //this.onNavigateHome();
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

    onNavigateHome() {
        this.router.navigate(['templates']);
    }
    onExport() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Export }));
    }

    onFileLoaded(fileContent) {
        if (fileContent && fileContent.content) {
            this.filename = fileContent.filename;
            fileContent.type = 'data';
            fileContent.content = JSON.parse(fileContent.content);

            if (fileContent.content.groupCode === 'custom' &&
                !(this.loadedTemplate &&
                    this.loadedTemplate.groupCode === 'custom' &&
                    fileContent.content.templateCode === this.loadedTemplate.code)) {
                this.messageService.add({
                    severity: "error", life: 10000, closable: true,
                    summary: "Incompatible file",
                    detail: `The loaded file was crafted using custom template (${fileContent.content.templateCode}). First load the custom template and they retry opening this file.`
                });
            } else {
                this.store$.dispatch(new LoadFileAction(fileContent));
            }
        }
    }

    onFileLoadingError = (err) => this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })
}
