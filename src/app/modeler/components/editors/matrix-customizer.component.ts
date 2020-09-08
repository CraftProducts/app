import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash-es';

@Component({
    selector: 'app-matrix-customizer',
    templateUrl: './matrix-customizer.component.html'
})
export class MatrixCustomizerComponent {
    @Input() selectedTab: any;

    _recordCode: any;
    @Input() set recordCode(value: any) {
        this._recordCode = value;
        this.recordCodeChange.emit(value);
    }
    get recordCode() { return this._recordCode; }
    @Output() recordCodeChange = new EventEmitter<any>();

    _mode: string;
    @Input() set mode(value: string) {
        this._mode = value;
        this.modeChange.emit(value);
    }
    get mode() { return this._mode }
    @Output() modeChange = new EventEmitter<any>();

    dataToEdit: any;
    _matrix: any;
    @Input() set matrix(value: any) {
        if (value) {
            value.properties = value.properties || { row: { title: 'Rows' }, column: { title: 'Columns' } }
        }
        this._matrix = value;
        this.dataToEdit = _.cloneDeep(value);
    }
    get matrix() {
        return this._matrix;
    }

    onEdit = () => this.mode = "EDIT";
    onReset = () => {
        this.mode = "VIEW";
        this.recordCode = null;
        this.dataToEdit = _.cloneDeep(this.matrix);
    }

    @Output() close = new EventEmitter<any>();
    onClose() {
        this.onReset();
        this.close.emit(false);
    }

    editingRecord = null;
    isEditingRecord = false;
    onEditingRecord = (args) => this.editingRecord = args;

    @Output() save = new EventEmitter<any>();
    onSave = () => this.save.emit(this.dataToEdit);
}
