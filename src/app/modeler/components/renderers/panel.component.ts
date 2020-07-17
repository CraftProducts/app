import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html'
})
export class PanelRendererComponent {
    @Input() section: any;
    @Output() showEditor = new EventEmitter<any>();

    onShowEditor(eventArgs) {
        this.showEditor.emit(eventArgs);
    }

    onShowItemDetails(item, section) {
        section.selectedItem = item;
        this.onShowEditor({ mode: 'VIEW', section });
    }
    getSelectedValue(selectedValue) {
        return selectedValue;
    }
}