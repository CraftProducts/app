import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { ValuePropState } from '../+state/valueprop.state';
import { State, Store } from '@ngrx/store';
import { SelectSectionAction } from '../+state/valueprop.actions';

@Component({
    selector: 'app-layout-renderer',
    templateUrl: './layout-renderer.component.html'
})
export class LayoutRendererComponent {
    @Input() layout: any;

    constructor(private store$: Store<ValuePropState>) { }

    showEditor(mode, section) {
        this.store$.dispatch(new SelectSectionAction({ mode, section }));
    }
}