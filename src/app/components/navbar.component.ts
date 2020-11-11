import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CloseWorkspaceAction, SaveLocationTypes, UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';
import { LoadFileAction } from '../+state/app.actions';
import { filter, map } from 'rxjs/operators';
import { LoadGitspaceArtifactAction, SetGitspaceConfigAction } from '../gitspace/+state/gitspace.actions';

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

    qp$: Subscription;

    constructor(public store$: Store<AppState>, public router: Router, public activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.qp$ = this.activatedRoute.queryParams
            .pipe(
                filter(p => p && p.filename && p.filename.length > 0 && this.filename != p.filename),
                map(p => p.filename)
            )
            .subscribe(filename => {
                this.filename = filename;
                this.loadArtifacts();
            })

        const sessionConfig = JSON.parse(sessionStorage.getItem("gitspace"));
        if (sessionConfig && sessionConfig.owner && sessionConfig.repo && sessionConfig.repo.length > 0) {
            this.store$.dispatch(new SetGitspaceConfigAction(sessionConfig));
            this.isGitSpace = true;
        }

        this.gitFile$ = this.store$.select(p => p.gitspace.loadedFile)
            .pipe(filter(p => p))
            .subscribe(gitFile => {
                gitFile.type = 'data';
                this.gitFile = gitFile;
                this.filename = gitFile.filename;
                this.store$.dispatch(new LoadFileAction(gitFile));  //copy over to make it compatible with existing infrastructure
            });

        this.gitConfig$ = this.store$.select(p => p.gitspace.config)
            .subscribe(config => {
                this.gitConfig = config;
                this.loadArtifacts();
            });

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
                    this.filename = this.filename || `${this.loadedTemplate.code}.json`;
                }
            });
    }
    private loadArtifacts() {
        if (this.gitConfig && this.filename && this.filename.length > 0) {
            this.store$.dispatch(new LoadGitspaceArtifactAction({ config: this.gitConfig, filename: this.filename }));
        }
    }

    ngOnDestroy(): void {
        this.gitFile$ ? this.gitFile$.unsubscribe() : null;
        this.gitConfig$ ? this.gitConfig$.unsubscribe() : null;
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
    }

    onNavigateHome = () => this.router.navigate(['templates']);

    onExport = () => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Export }));


    onCreateArtifact() {
        this.router.navigate(['/templates']);
        this.showGitspaceFiles = false;
    }
    onArtifactSelected(filename) {
        this.router.navigate([], { queryParams: { filename } });
        this.showGitspaceFiles = false;
    }

    onResetFile = (data) => this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Reset, data }));

    onCloseFile = () => {
        this.filename = null;
        this.store$.dispatch(new CloseWorkspaceAction(null));
        this.router.navigate(["templates"], { queryParams: { filename: null }, queryParamsHandling: "merge" });
    }

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
