import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-matrix-editor',
    templateUrl: './matrix-editor.component.html'
})
export class MatrixEditorComponent {
    @Input() mode: string;
    @Input() section: any;
    @Output() itemChange = new EventEmitter<any>();

    onToggleMode = (eventArgs) => {
        this.mode = eventArgs.mode;
    }

    onChange() {
        if (this.section.selectedItem) {
            const rowCode = this.section.selectedItem.rowCode;
            const colCode = this.section.selectedItem.colCode;

            const dtFound = _.find(this.section.rows, { code: rowCode });
            this.section.selectedItem.datatype = (dtFound) ? dtFound.datatype : 'text';

            const found = _.find(this.section.data, { rowCode, colCode });
            this.section.selectedItem.data = (found) ? found.data : {};
        }
    }

    onUpdated(updatedData) {
        if (this.section.selectedItem) {
            this.section.selectedItem.data = updatedData;

            this.section.data = this.section.data || [];

            const rowCode = this.section.selectedItem.rowCode;
            const colCode = this.section.selectedItem.colCode;
            const found = _.find(this.section.data, { rowCode, colCode });
            if (found) {
                found.data = updatedData;
            } else {
                this.section.data.push(this.section.selectedItem);
            }

        }

        this.itemChange.emit(this.section);
        this.mode = 'VIEW';
    }

    onItemChanged = (args) => this.itemChange.emit(args);
}