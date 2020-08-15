import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-matrix-editor',
    templateUrl: './matrix-editor.component.html'
})
export class MatrixEditorComponent {
    prevColumn: any;
    nextColumn: any;

    @Input() mode: string;

    _section: any;
    @Input() set section(value: any) {
        console.log('section', value);
        this._section = value;
        if (value) {
            if (value.selectedItem) {
                this.rowCode = value.selectedItem.rowCode;
                this.colCode = value.selectedItem.colCode;
            }
            else if (value.columns && value.columns.length > 0) {
                this.prepareEditor(value.columns[0].code);
            }
        }
    }
    get section(): any {
        return this._section;
    }

    @Output() itemChange = new EventEmitter<any>();

    selectedTab = 0;

    rowCode: string = "";
    colCode: string = "";

    onToggleMode = (eventArgs) => {
        this.mode = eventArgs.mode;
    }
    selectedForm: any;
    prepareEditor(colCode) {
        this.selectedForm = { code: colCode };
        if (colCode) {
            if (this.section && this.section.columns) {
                const index = _.findIndex(this.section.columns, { code: colCode });
                this.selectedForm = this.section.columns[index];
                this.prevColumn = (index > 0) ? this.section.columns[index - 1] : null;
                this.nextColumn = (index < this.section.columns.length - 1) ? this.section.columns[index + 1] : null;
            }
            this.selectedTab = 0;
            this.selectedForm.rows = _.map(this.section.rows, (row) => {
                const record: any = _.pick(row, ['code', 'title', 'datatype', 'property']);
                record.column = _.find(row.columns, { colCode })
                return record;
            });
        }
    }
    onChange() {
        console.log('before', this.section.selectedItem);
        if (this.section.selectedItem) {
            const rowFound = _.find(this.section.rows, { code: this.rowCode });
            if (rowFound && rowFound.columns && rowFound.columns.length > 0) {
                this.section.selectedItem = _.find(rowFound.columns, { colCode: this.colCode });
                console.log('after', this.section.selectedItem);
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