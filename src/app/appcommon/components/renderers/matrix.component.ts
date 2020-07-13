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

    onShowItemDetails(row, col) {
        this.section.selectedItem = this.getSection(row, col);
        this.onShowEditor({ mode: 'VIEW', section: this.section });
    }

    getSection(row, col) {
        const subSection = {
            rowCode: row.code,
            colCode: col.code,
            datatype: row.datatype,
            data: null
        }
        if (this.section.data) {
            const found = _.find(this.section.data, { rowCode: row.code, colCode: col.code });
            if (found) {
                subSection.data = found.data;
            }
        }

        return subSection;
    }
}
