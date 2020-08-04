import { Component, OnDestroy, OnInit, Input } from '@angular/core';
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

    @Input() template: any;

    selectedTemplateGroup$: Subscription;
    selectedTemplateGroup: any;

    constructor(public store$: Store<AppState>, public router: Router) { }

    ngOnInit(): void {
        this.selectedTemplateGroup$ = this.store$.select(p => p.app.selectedTemplateGroup)
            .subscribe(templateGroup => this.selectedTemplateGroup = templateGroup);
    }
    ngOnDestroy(): void {
        this.selectedTemplateGroup$ ? this.selectedTemplateGroup$.unsubscribe() : null;
    }

    onCustomizeTheme() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.CustomizeTheme }));
    }

    onDownloadTemplate() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.SaveTemplate }));
    }
}
