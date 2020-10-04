import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';
import { LoadFileAction, SetGitspaceAction } from '../+state/app.actions';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-gitspace',
    templateUrl: './gitspace.component.html'
})
export class GitspaceComponent implements OnInit, OnDestroy {
    @Output() showChange = new EventEmitter<any>();
    @Input() set show(value: boolean) {
        if (value) {
            this.connectToGithub();
        }
    }
    gitspace$: Subscription;
    gitspace: any;

    constructor(public store$: Store<AppState>) {
    }

    ngOnInit(): void {
        this.gitspace$ = this.store$.select(p => p.app.gitspace)
            .subscribe(p => this.gitspace = p);

        window.addEventListener('message', event => {
            if (event.origin.startsWith(environment.githubApp.url)) {
                console.log('event.data', event.data);
                sessionStorage.setItem("gitspace", event.data);
                this.store$.dispatch(new SetGitspaceAction(event.data));
            }
        });
    }

    ngOnDestroy(): void {
        this.gitspace$ ? this.gitspace$.unsubscribe() : null;
    }
    onSwitchToLocalSpace() {
        this.showChange.emit(false);
        this.store$.dispatch(new SetGitspaceAction(null));
    }
    connectToGithub(event = null) {
        if(event){
            event.stopPropagation();
        }
        const h = 768;
        const w = 1024;
        const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
        window.open(`${environment.githubApp.url}/login`, 'name',
            `toolbar=no, location=no, directories=no, status=no, menubar=no,  copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }
}