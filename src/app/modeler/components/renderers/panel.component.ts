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
    @Input() allowDragdrop = false;

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
    dragStart(item, dragContainer) {
        this.draggedItem = item;
        console.log('dragStart', this.draggedItem, dragContainer);
    }

    drop(dropContainer) {
        console.log('drop', this.draggedItem, dropContainer);
        // if (this.draggedItem) {
        //     this.draggedItem = null;
        // }
    }

    dragEnd() {
        console.log('dragEnd', this.draggedItem);
        //setTimeout(() => this.draggedItem = null, 10000);
    }

}