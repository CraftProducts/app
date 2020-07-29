import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { UserModelCommandAction, UserModelCommandTypes } from '../appcommon/lib/CommonActions';
import { tap, filter } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    loadedTemplate$: Subscription;
    templateLoaded = false;

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }
    ngOnInit(): void {
        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);
            
        this.loadedTemplate$ = this.store$.select(p => p.app.loadedTemplate)
            .pipe(
                tap(() => this.templateLoaded = false),
                filter(p => p),
                tap(() => this.templateLoaded = true)
            )
            .subscribe(() => { });
    }
    ngOnDestroy(): void {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
    }

    onExport() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Export }));
    }
    onCustomizeTheme() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.CustomizeTheme }));
    }
}
