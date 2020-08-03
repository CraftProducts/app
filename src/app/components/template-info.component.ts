import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';

@Component({
    selector: 'app-template-info',
    templateUrl: './template-info.component.html'
})
export class TemplateInfoComponent implements OnInit, OnDestroy {

    loadedTemplate$: Subscription;
    loadedTemplate: any;

    selectedTemplateGroup$: Subscription;
    selectedTemplateGroup: any;

    constructor(public store$: Store<AppState>, public router: Router) {
    }
    ngOnInit(): void {
        this.loadedTemplate$ = this.store$.select(p => p.app.loadedTemplate)
            .subscribe(template => this.loadedTemplate = template);

        this.selectedTemplateGroup$ = this.store$.select(p => p.app.selectedTemplateGroup)
            .subscribe(templateGroup => this.selectedTemplateGroup = templateGroup);
    }
    ngOnDestroy(): void {
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
        this.selectedTemplateGroup$ ? this.selectedTemplateGroup$.unsubscribe() : null;
    }

    onCustomizeTheme() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.CustomizeTheme }));
    }

    onDownloadTemplate() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.SaveTemplate }));
    }
}
