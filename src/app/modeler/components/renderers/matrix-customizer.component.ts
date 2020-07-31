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
        this._matrix = value;
        this.dataToEdit = _.cloneDeep(value);
    }
    get matrix() {
        return this._matrix;
    }
    @Output() close = new EventEmitter<any>();

    onReset = () => this.dataToEdit = _.cloneDeep(this.matrix);

    onClose() {
        this.close.emit(false);
    }
}
