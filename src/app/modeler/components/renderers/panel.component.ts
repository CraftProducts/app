import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html'
})
export class PanelRendererComponent {
    @Input() parentCode: string;
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

    draggedItem: any;
    dragStart(event, item, dragContainer) {
        this.draggedItem = item;
        console.log('dragStart', event, this.draggedItem, dragContainer);
    }

    drop(event, dropContainer) {
        console.log('drop', event, this.draggedItem, dropContainer);
        if (this.draggedItem) {
            this.draggedItem = null;
        }
    }

    dragEnd(event) {
        console.log('dragEnd', event, this.draggedItem);
        //setTimeout(() => this.draggedItem = null, 10000);
    }

}