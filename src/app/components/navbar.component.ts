import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SaveLocationTypes, UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';
import { LoadFileAction } from '../+state/app.actions';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
    showGitspaceFiles = false;
    loadedTemplate$: Subscription;
    loadedTemplate: any;
    templateLoaded = false;

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    filename = "";
    isGitSpace = false;

    gitFile$: Subscription;
    gitFile: any;
    gitConfig$: Subscription;
    gitConfig: any;

    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }

    ngOnInit(): void {

        this.gitFile$ = this.store$.select(p => p.gitspace.loadedFile)
            .pipe(filter(p => p))
            .subscribe(gitFile => {
                gitFile.type = 'data';
                this.gitFile = gitFile;
                this.filename = gitFile.filename;
                this.store$.dispatch(new LoadFileAction(gitFile));  //copy over to make it compatible with existing infrastructure
            });

        this.gitConfig$ = this.store$.select(p => p.gitspace.config)
            .subscribe(p => this.gitConfig = p);

        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => {
                this.isModelDirty = p;
                console.log('this.isModelDirty', this.isModelDirty);
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
                    this.filename = this.filename || `${this.loadedTemplate.code}.json`;
                }
            });
    }
    ngOnDestroy(): void {
        this.gitFile$ ? this.gitFile$.unsubscribe() : null;
        this.gitConfig$ ? this.gitConfig$.unsubscribe() : null;
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
    }

    onNavigateHome() {
        this.router.navigate(['templates']);
    }
    onExport() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Export }));
    }

    onCreateArtifact() {
        this.showGitspaceFiles = false;
        this.router.navigate(['/templates']);
    }

    onResetFile = (data) => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Reset, data }));
    onCloseFile = () => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Close }));
    onSaveFile = (args) => {
        const data = {
            filename: this.filename,
            saveLocation: this.isGitSpace ? SaveLocationTypes.GitSpace : SaveLocationTypes.LocalSpace,
            gitConfig: this.gitConfig,
            ...args
        };
        this.store$.dispatch(new UserModelCommandAction({
            command: UserModelCommandTypes.Save,
            data
        }));
    }
}
