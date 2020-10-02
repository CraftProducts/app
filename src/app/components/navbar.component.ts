import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';
import { LoadFileAction, SetGithubAccessTokenAction } from '../+state/app.actions';
import { environment } from '../../environments/environment';

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
        window.addEventListener('message', event => {
            if (event.origin.startsWith(environment.githubApp.url)) {
                console.log('event.data', event.data);
                sessionStorage.setItem("github_accesstoken", event.data.token);
                this.router.navigate(["/templates", event.data.owner, event.data.repo]);
                this.store$.dispatch(new SetGithubAccessTokenAction(event.data.token));
            }
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

    openAuthWindow() {
        const h = 768;
        const w = 1024;
        const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
        window.open(`${environment.githubApp.url}/login`, 'name',
            `toolbar=no, location=no, directories=no, status=no, menubar=no,  copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
    }
}
