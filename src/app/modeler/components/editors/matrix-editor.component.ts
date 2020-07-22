import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-matrix-editor',
    templateUrl: './matrix-editor.component.html'
})
export class MatrixEditorComponent {
    @Input() mode: string;

    _section: any;
    @Input() set section(value: any) {
        this._section = value;
        if (value && value.selectedItem) {
            this.rowCode = value.selectedItem.rowCode;
            this.colCode = value.selectedItem.colCode;
        }
    }
    get section(): any {
        return this._section;
    }

    @Output() itemChange = new EventEmitter<any>();

    rowCode: string;
    colCode: string;

    onToggleMode = (eventArgs) => {
        this.mode = eventArgs.mode;
    }

    onChange() {
        if (this.section.selectedItem) {
            const rowFound = _.find(this.section.rows, { code: this.rowCode });
            console.log('rowFound', rowFound, this.colCode);
            if (rowFound && rowFound.columns && rowFound.columns.length > 0) {
                this.section.selectedItem = _.find(rowFound.columns, { colCode: this.colCode });
                console.log(this.section.selectedItem);
            }
        }
    }

    onUpdated(updatedData) {
        if (this.section.selectedItem) {
            this.section.selectedItem.data = updatedData;
            this.section.selectedItem.isDirty = true;
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