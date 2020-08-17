import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-matrix-editor',
    templateUrl: './matrix-editor.component.html'
})
export class MatrixEditorComponent {
    @Output() close = new EventEmitter<any>();

    recordDataToEdit: any;
    prevColumn: any;
    nextColumn: any;

    @Input() mode: string;
    @Input() rowCode: string;

    @Input() section: any;

    _colCode: any;
    @Input() set colCode(value: any) {
        this._colCode = value;
        this.prepareEditor(value);
    }
    get colCode(): any {
        return this._colCode;
    }

    @Output() itemChange = new EventEmitter<any>();

    selectedTab = 0;

    onToggleMode = (eventArgs) => this.mode = eventArgs.mode;

    selectedColumn: any;
    selectedSection: any;
    prepareEditor(colCode) {
        this.selectedColumn = null;
        this.selectedSection = null;
        if (this.rowCode && colCode && this.section) {
            if (this.section.columns) {
                const index = _.findIndex(this.section.columns, { code: colCode });
                this.selectedColumn = this.section.columns[index];
                this.recordDataToEdit = (this.selectedColumn.datatype === DATATYPES.list) ? null : this.selectedColumn;
                this.prevColumn = (index > 0) ? this.section.columns[index - 1] : null;
                this.nextColumn = (index < this.section.columns.length - 1) ? this.section.columns[index + 1] : null;
            }
            this.selectedTab = 0;
            const found = _.find(this.section.rows, { code: this.rowCode })
            this.selectedSection = _.find(found.columns, { colCode });
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
}