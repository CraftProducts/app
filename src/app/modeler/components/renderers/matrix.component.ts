import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ModelerState } from '../../+state/modeler.state';
import { CustomizeSectionAction } from '../../+state/modeler.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-matrix',
    templateUrl: './matrix.component.html'
})
export class MatrixRendererComponent {
    @Input() section: any;
    @Output() showEditor = new EventEmitter<any>();

    isCustomizerVisible = false;

    constructor(public store$: Store<ModelerState>) {
    }

    onShowEditor = (eventArgs) => this.showEditor.emit(eventArgs);

    onShowItemDetails(section) {
        this.section.selectedItem = section;
        this.onShowEditor({ mode: 'VIEW', section: this.section });
    }

    onClose = () => this.isCustomizerVisible = false;
    onCustomize(args) {
        this.onClose();
        this.store$.dispatch(new CustomizeSectionAction(args));
    }
}
