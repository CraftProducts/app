import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { TemplatesState } from '../+state/templates.state';
import { Subscription } from 'rxjs';
import { LoadGroupTemplatesAction } from '../+state/templates.actions';
import { filter, tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'templates-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
    @Input() templateDetails: any;
    isCollapsed = true;
    group: string;
    details$: Subscription;
    details: any;
    constructor(public store$: Store<TemplatesState>, public activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(filter(p => p && p["group"] && p["group"].length > 0), map(p => p["group"]))
            .subscribe(group => {
                console.log('param', group);
                this.group = group;
                this.store$.dispatch(new LoadGroupTemplatesAction(group));
            });

        this.details$ = this.store$.select(p => p.templates.groupTemplates)
            .pipe(filter(details => details), tap(p => console.log('groupTemplates', p)))
            .subscribe(templateDetails => this.details = templateDetails);
    }
    ngOnDestroy(): void {
        this.details$ ? this.details$.unsubscribe() : null;
    }
}
