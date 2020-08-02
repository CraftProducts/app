import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-matrix-customizer',
    templateUrl: './matrix-customizer.component.html'
})
export class MatrixCustomizerComponent {
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

    onReset = () => this.dataToEdit = _.cloneDeep(this.matrix);

    @Output() close = new EventEmitter<any>();
    onClose() {
        this.onReset();
        this.close.emit(false);
    }

    editingRecord = null;
    onEditingRecord = (args) => this.editingRecord = args;

    @Output() save = new EventEmitter<any>();
    onSave = () => this.save.emit(this.dataToEdit);
}
