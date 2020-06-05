import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { filter } from 'rxjs/operators';
import { LoadAllTemplateAction } from '../+state/valueprop.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-valueprop-home',
    templateUrl: './home.component.html'
})
export class ValuePropHomeComponent implements OnInit, OnDestroy {
    templates$: Subscription;
    templates: any;

    currentTemplate$: Subscription;
    currentTemplate: any;
    constructor(public store$: Store<ValuePropState>) { }

    ngOnInit() {

        this.store$.dispatch(new LoadAllTemplateAction(null));

        this.templates$ = this.store$.select(p => p.valueProp.templates)
            .pipe(filter(templates => templates))
            .subscribe(templates => this.templates = templates);

        this.templates$ = this.store$.select(p => p.valueProp.currentTemplate)
            .pipe(filter(ct => ct))
            .subscribe(ct => this.currentTemplate = ct);
    }
    ngOnDestroy(): void {
        this.templates$ ? this.templates$.unsubscribe() : null;
        this.currentTemplate$ ? this.currentTemplate$.unsubscribe() : null;
    }

}
