import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }
    ngOnInit(): void {
        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);
    }
    ngOnDestroy(): void {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
    }
}
