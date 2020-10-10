import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { GitspaceState } from '../+state/gitspace.state';
import { Subscription } from 'rxjs';
import { SetGitspaceConfigAction } from '../+state/gitspace.actions';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'gitspace-menu',
    templateUrl: './menu.component.html'
})
export class GitspaceMenuComponent implements OnInit, OnDestroy {
    @Output() showFiles = new EventEmitter<any>();

    @Output() showChange = new EventEmitter<any>();
    @Input() set show(value: boolean) {
        if (value) {
            this.connectToGithub();
        }
    }
    config$: Subscription;
    config: any;

    showFilesSidebar = false;
    showGitspaceSelector = false;
    
    constructor(public store$: Store<GitspaceState>) {
    }

    ngOnInit(): void {
        this.config$ = this.store$.select(p => p.gitspace.config)
            .subscribe(p => this.config = p);

        window.addEventListener('message', event => {
            if (event.origin.startsWith(environment.githubApp.url)) {
                sessionStorage.setItem("gitspace", JSON.stringify(event.data));
                this.store$.dispatch(new SetGitspaceConfigAction(event.data));
                this.onShowFilesSidebar();
            }
        });
    }

    ngOnDestroy(): void {
        this.config$ ? this.config$.unsubscribe() : null;
    }
    onSwitchToLocalSpace() {
        this.showChange.emit(false);
        this.store$.dispatch(new SetGitspaceConfigAction(null));
    }
    connectToGithub(event = null) {
        if (event) {
            event.stopPropagation();
        }
        const h = 768;
        const w = 1024;
        const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
        window.open(`${environment.githubApp.url}/login`, 'name',
            `toolbar=no, location=no, directories=no, status=no, menubar=no,  copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }

    onShowFilesSidebar() {
        this.showFiles.emit(true);
    }
}