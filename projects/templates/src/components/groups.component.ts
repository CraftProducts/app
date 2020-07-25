import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { TemplatesState } from '../+state/templates.state';
import { Subscription } from 'rxjs';
import { LoadGroupsAction, SetRedirectPathAction, LoadFileAction } from '../+state/templates.actions';
import { filter, tap, map } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';

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

    constructor(public store$: Store<TemplatesState>, public router: Router, public activatedRoute: ActivatedRoute,
        public messageService: MessageService) { }

    ngOnInit(): void {

        this.redirectTo$ = this.activatedRoute.data
            .pipe(
                filter(data => data["redirectTo"] && data["redirectTo"].length > 0),
                map(data => data["redirectTo"])
            )
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

    onFileLoaded(fileContent) {
        if (fileContent && fileContent.content) {
            fileContent.content = JSON.parse(fileContent.content);
        }
        this.store$.dispatch(new LoadFileAction(fileContent));
    }

    onFileLoadingError(err) {
        this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })
    }
}
