import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-matrix',
    templateUrl: './matrix.component.html'
})
export class MatrixRendererComponent {
    @Input() section: any;
    @Output() showEditor = new EventEmitter<any>();

    onShowEditor(eventArgs) {
        this.showEditor.emit(eventArgs);
    }

    onShowItemDetails(item, section) {
        section.selectedItem = item;
        this.onShowEditor({ mode: 'VIEW', section });
    }

    getSection(row, col) {
        return {
            datatype: 'text',
            data: {
                text: 'sample text'
            }
        }
    }
}