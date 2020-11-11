import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { GitspaceState } from '../+state/gitspace.state';
import { ResetGitspaceArtifactAction, SetGitspaceConfigAction } from '../+state/gitspace.actions';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import * as _ from "lodash-es";

@Component({
    selector: 'app-gitspace',
    templateUrl: './gitspace.component.html'
})
export class GitspaceComponent implements OnInit, OnDestroy {
    gitFile$: Subscription;
    sha = '';
    content: any;
    @Input() filename = '';
    @Output() filenameChange = new EventEmitter<any>();
    @Input() isModelDirty: boolean;

    @Output() reset = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();

    @Output() showFiles = new EventEmitter<any>();
    @Output() configChanged = new EventEmitter<any>();

    @Output() showChange = new EventEmitter<any>();
    @Input() set show(value: boolean) {
        (value) ? this.connectToGithub() : null;
    }

    @Input() config: any;

    showFilesSidebar = false;

    constructor(public store$: Store<GitspaceState>) {
    }

    ngOnInit(): void {
        this.gitFile$ = this.store$.select(p => p.gitspace.loadedFile)
            .subscribe(file => {
                this.sha = file ? file.sha : null;
                if (file) {
                    this.filename = file.filename;
                    this.filenameChange.emit(this.filename);
                }

                this.content = file && file.content ? file.content : null;
            });

        window.addEventListener('message', event => {
            if (event.origin.startsWith(environment.githubApp.url)) {
                sessionStorage.setItem("gitspace", JSON.stringify(event.data));
                this.store$.dispatch(new SetGitspaceConfigAction(event.data));
                this.onShowFiles();
            }
        });
    }

    ngOnDestroy(): void {
        this.gitFile$ ? this.gitFile$.unsubscribe() : null;
    }
    onSwitchToLocalSpace() {
        this.showChange.emit(false);
        this.store$.dispatch(new SetGitspaceConfigAction(null));
    }

    connectToGithub(event = null, force = false) {
        if (event) {
            event.stopPropagation();
        }

        const sessionConfig = JSON.parse(sessionStorage.getItem("gitspace"));
        if (!force && sessionConfig && sessionConfig.owner && sessionConfig.repo && sessionConfig.repo.length > 0) {
            this.store$.dispatch(new SetGitspaceConfigAction(sessionConfig));
        } else {
            const h = 768;
            const w = 1024;
            const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
            const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
            window.open(`${environment.githubApp.url}/login`, 'name',
                `toolbar=no, location=no, directories=no, status=no, menubar=no,  copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
        }
    }

    onShowFiles = () => this.showFiles.emit(true);

    canSave = () => this.isModelDirty &&
        this.filename && this.filename.trim().length > 0 && _.endsWith(this.filename.trim().toLowerCase(), '.json');

    onSave = () => {
        if (this.canSave()) {
            this.filenameChange.emit(this.filename);
            this.save.emit({ sha: this.sha });
        }
    }

    // onSave = () => this.save.emit({ sha: this.sha });
    onReset = () => {
        this.store$.dispatch(new ResetGitspaceArtifactAction(null));
        this.reset.emit(this.content);
    }
    onClose = () => {
        this.store$.dispatch(new ResetGitspaceArtifactAction(null));
        this.close.emit(null);
    }
}
