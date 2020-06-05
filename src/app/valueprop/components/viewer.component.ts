import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { LoadTemplateAction } from '../+state/valueprop.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-valueprop-viewer',
    templateUrl: './viewer.component.html'
})
export class ValuePropViewerComponent implements OnInit, OnDestroy {

    currentTemplate$: Subscription;

    constructor(public store$: Store<ValuePropState>, public activatedRoute: ActivatedRoute) {
        activatedRoute.params
            .pipe(filter(p => p && p["template"] && p["template"].length > 0), map(p => p["template"]))
            .subscribe(template => store$.dispatch(new LoadTemplateAction(template)));
    }

    layout: any;

    ngOnInit() {
        this.currentTemplate$ = this.store$.select(p => p.valueProp.currentTemplate)
            .pipe(filter(template => template))
            .subscribe(template => this.layout = template);
    }
    ngOnDestroy(): void {
        this.currentTemplate$ ? this.currentTemplate$.unsubscribe() : null;
    }
}
