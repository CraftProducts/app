import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { UserModelCommandTypes, UserModelCommandAction } from '../appcommon/lib/CommonActions';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    constructor(public store$: Store<AppState>) {
    }
    ngOnInit(): void {
        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);
    }
    ngOnDestroy(): void {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
    }

    onSave() {
        this.store$.dispatch(new UserModelCommandAction(UserModelCommandTypes.Save));
    }
    onReset() {
        this.store$.dispatch(new UserModelCommandAction(UserModelCommandTypes.Reset));
    }
}
