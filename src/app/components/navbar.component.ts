import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    isCollapsed = true;
    constructor(public store$: Store<AppState>) {
    }

    ngOnInit(): void {
    }
    ngOnDestroy(): void {
    }
}
