import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html'
})
export class PanelRendererComponent {

    @Input() parentCode: string;

    @Input() sectionCodes = [];
    @Input() section: any;

    @Output() drop = new EventEmitter<any>();

    @Output() showEditor = new EventEmitter<any>();
    onShowEditor = (eventArgs) => this.showEditor.emit(eventArgs);

    onShowItemDetails(item, section) {
        section.selectedItem = item;
        this.onShowEditor({ mode: 'VIEW', section });
    }

    getSelectedValue(selectedValue) {
        if (this.section && this.section.options) {
            const found = _.find(this.section.options, { code: selectedValue });
            return (found) ? found.title : selectedValue;
        }
        return selectedValue;
    }
    cdkDrop(event) {
        if (event.previousContainer.data.rowCode === event.container.data.rowCode &&
            event.previousContainer.data.colCode === event.container.data.colCode &&
            event.previousIndex === event.currentIndex) {
            // this indicates the item was dropped to invalid location
        } else {
            this.drop.emit(event);
        }
    }
}