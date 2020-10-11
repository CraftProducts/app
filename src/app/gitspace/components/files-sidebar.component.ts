import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadGitspaceAllArtifactsAction, LoadGitspaceArtifactAction } from '../+state/gitspace.actions';
import { GitspaceState } from '../+state/gitspace.state';

@Component({
    selector: 'gitspace-files-sidebar',
    templateUrl: './files-sidebar.component.html'
})
export class GitspaceFilesComponent implements OnInit, OnDestroy {
    @Output() close = new EventEmitter<any>();
    @Output() createArtifact = new EventEmitter<any>();

    _config: any;
    @Input() set config(value: any) {
        this._config = value;
        if (value) {
            this.store$.dispatch(new LoadGitspaceAllArtifactsAction(value));
        }
    }
    get config() { return this._config; }

    files$: Subscription;
    files: any;

    isInitCollapsed = false;
    constructor(public store$: Store<GitspaceState>) {
    }

    ngOnInit(): void {
        this.files$ = this.store$.select(p => p.gitspace.files)
            .subscribe(files => this.files = files || [])
    }

    ngOnDestroy(): void {
        this.files$ ? this.files$.unsubscribe() : null;
    }

    onClose = () => this.close.emit();
    onCreateArtifact = () => this.createArtifact.emit();

    onSelect(file) {
        this.store$.dispatch(new LoadGitspaceArtifactAction({ config: this.config, filename: file.name }));
        this.onClose();
    }
}
