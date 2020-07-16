import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ResetTemplateAction } from '../+state/app.actions';

@Component({
    selector: 'app-template-info',
    templateUrl: './template-info.component.html'
})
export class TemplateInfoComponent implements OnInit, OnDestroy {

    loadedTemplate$: Subscription;
    loadedTemplate: any;

    constructor(public store$: Store<AppState>, public router: Router) {
    }
    ngOnInit(): void {
        this.loadedTemplate$ = this.store$.select(p => p.app.loadedTemplate)
            .subscribe(template => this.loadedTemplate = template);
    }
    ngOnDestroy(): void {
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
    }

    goBack() {
        this.store$.dispatch(new ResetTemplateAction(null));
        this.router.navigate(['/tools']);
    }
}
