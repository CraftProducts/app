import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-matrix-editor',
    templateUrl: './matrix-editor.component.html'
})
export class MatrixEditorComponent {
    @Output() itemChange = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Output() changeSection = new EventEmitter<any>();

    recordDataToEdit: any;
    prevColumn: any;
    nextColumn: any;

    @Input() mode: string;

    @Input() section: any;

    _rowCode: any;
    @Input() set rowCode(value: any) {
        this._rowCode = value;
        this.prepareEditor();
    }
    get rowCode(): any { return this._rowCode; }

    _colCode: any;
    @Input() set colCode(value: any) {
        this._colCode = value;
        this.prepareEditor();
    }
    get colCode(): any { return this._colCode; }

    onToggleMode = (eventArgs) => this.mode = eventArgs.mode;

    selectedColumn: any;
    selectedSection: any;
    prepareEditor() {
        this.selectedColumn = null;
        this.selectedSection = null;
        if (this.rowCode && this.colCode && this.section) {
            const found = _.find(this.section.rows, { code: this.rowCode })
            if (found) {
                this.selectedSection = _.find(found.columns, { colCode: this.colCode });
                this.recordDataToEdit = (this.selectedSection.datatype === DATATYPES.list) ? null : this.selectedSection;

                if (this.section.columns) {
                    const index = _.findIndex(this.section.columns, { code: this.colCode });
                    this.selectedColumn = this.section.columns[index];
                    this.prevColumn = (index > 0) ? this.section.columns[index - 1] : null;
                    this.nextColumn = (index < this.section.columns.length - 1) ? this.section.columns[index + 1] : null;
                }
            }
        }
    }

    onUpdated(updatedData) {
        if (this.selectedSection) {
            this.selectedSection.data = updatedData;
            this.selectedSection.isDirty = true;
            this.section.data = this.section.data || [];

            const rowCode = this.selectedSection.rowCode;
            const colCode = this.selectedSection.colCode;
            const found = _.find(this.section.data, { rowCode, colCode });
            if (found) {
                found.data = updatedData;
            } else {
                this.section.data.push(this.selectedSection);
            }
        }

        this.itemChange.emit(this.section);
        this.mode = 'VIEW';
    }

    //onItemChanged = (args) => this.itemChange.emit(args);
    onItemChanged(item, section) {
        section.isDirty = true;
        this.itemChange.emit(section);
    }

    closeEditor = () => this.close.emit(null);

    onItemSelected = (data) => this.recordDataToEdit = { data };

    onChangeColumn = (colCode) => this.changeSection.emit({ colCode, rowCode: this.rowCode, section: this.section });
    onChangeRow = (rowCode) => this.changeSection.emit({ colCode: this.colCode, rowCode, section: this.section });
}