import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/app.state';
import { environment } from "../../environments/environment"

@Component({
    selector: 'app-tools',
    templateUrl: './tools.component.html'
})
export class ToolsComponent {
    public version = environment.VERSION;

    constructor(public store$: Store<AppState>) {
    }
}