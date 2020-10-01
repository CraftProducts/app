import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(public store$: Store<AppState>, public activatedRoute: ActivatedRoute) {
        activatedRoute.queryParams.subscribe(p => console.log('activateroute: ', p))
    }
}
