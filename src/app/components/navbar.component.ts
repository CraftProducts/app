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
    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }
    ngOnInit(): void {
        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);

        this.loadedTemplate$ = this.store$.select(p => p.app.loadedTemplate)
            .pipe(
                tap(() => this.templateLoaded = false),
                filter(p => p),
                tap(() => this.templateLoaded = true)
            )
            .subscribe(template => this.loadedTemplate = template);
    }
    ngOnDestroy(): void {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
    }

    onExport() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Export }));
    }
    onCustomizeTheme() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.CustomizeTheme }));
    }

    onFileLoaded(fileContent) {
        console.log('onFileLoaded', fileContent);
        if (fileContent && fileContent.content) {
            fileContent.type = 'data';
            fileContent.content = JSON.parse(fileContent.content);
            console.log(fileContent.content.groupCode, this.loadedTemplate);
            if (!(fileContent.content.groupCode === 'custom' &&
                this.loadedTemplate &&
                this.loadedTemplate.groupCode === 'custom' &&
                fileContent.content.templateCode === this.loadedTemplate.code)) {
                this.messageService.add({ severity: 'error', detail: 'The loaded file is incompatible with the custom template', life: 5000, closable: true });
            } else {
                console.log('fileContent', fileContent)
                this.store$.dispatch(new LoadFileAction(fileContent));
            }
        }
    }

    onFileLoadingError = (err) => this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })
}
