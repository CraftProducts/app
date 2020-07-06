import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { TemplatesState } from '../+state/templates.state';
import { Subscription } from 'rxjs';
import { LoadGroupsAction, SetRedirectPathAction } from '../+state/templates.actions';
import { filter, tap, map } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'templates-groups',
    templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit, OnDestroy {
    showBanner = true;
    eventNavigationEnd$: Subscription;

    details$: Subscription;
    details: any;

    redirectTo$: Subscription;
    constructor(public store$: Store<TemplatesState>, public router: Router, public activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {

        this.redirectTo$ = this.activatedRoute.data
            .pipe(filter(p => p["redirectTo"] && p["redirectTo"].length > 0), map(p => p["redirectTo"]))
            .subscribe(redirectTo => this.store$.dispatch(new SetRedirectPathAction(redirectTo)));

        this.eventNavigationEnd$ = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.showBanner = this.activatedRoute.children.length === 0)
        this.showBanner = this.activatedRoute.children.length === 0;

        this.store$.dispatch(new LoadGroupsAction(null));

        this.details$ = this.store$.select(p => p.templates.groups)
            .pipe(filter(details => details))
            .subscribe(details => this.details = details);
    }

    ngOnDestroy(): void {
        this.redirectTo$ ? this.redirectTo$.unsubscribe() : null;
        this.eventNavigationEnd$ ? this.eventNavigationEnd$.unsubscribe() : null;
        this.details$ ? this.details$.unsubscribe() : null;
    }
}
