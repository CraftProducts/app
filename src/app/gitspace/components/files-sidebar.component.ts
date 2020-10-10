import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadGitspaceFilesAction, InitializeGitspaceAction } from '../+state/gitspace.actions';
import { GitspaceState } from '../+state/gitspace.state';

@Component({
    selector: 'gitspace-files-sidebar',
    templateUrl: './files-sidebar.component.html'
})
export class GitspaceFilesComponent implements OnInit, OnDestroy {
    @Output() close = new EventEmitter<any>();

    combined$: Subscription;
    config: any;
    files: any;

    isInitCollapsed = false;
    constructor(public store$: Store<GitspaceState>) {
    }

    ngOnInit(): void {
        const configQ = this.store$.select(p => p.gitspace.config).pipe(filter(p => p));
        const filesQ = this.store$.select(p => p.gitspace.files);

        this.combined$ = combineLatest([configQ, filesQ])
            .subscribe(([config, files]) => {
                console.log('config, files', config, files);
                if (!this.config || config.owner !== this.config.owner || config.repo !== this.config.repo) {
                    this.files = null;
                }

                if (!files && !this.files) {
                    this.store$.dispatch(new LoadGitspaceFilesAction(config))
                }
                this.config = config;
                this.config.location = this.config.location || "CraftProducts";
                this.files = files || [];
            })
    }

    ngOnDestroy(): void {
        this.combined$ ? this.combined$.unsubscribe() : null;
    }

    onClose = () => this.close.emit();

    onSelect(file) {
        console.log('load', file);
    }

    onInitializeGitspace() {
        this.store$.dispatch(new InitializeGitspaceAction({ config: this.config, content: this.config.location }));
    }
}
