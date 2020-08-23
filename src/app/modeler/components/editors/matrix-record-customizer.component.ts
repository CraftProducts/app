import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-matrix-record-customizer',
    templateUrl: './matrix-record-customizer.component.html'
})
export class MatrixRecordCustomizerComponent {
    _record: any;
    @Input() set record(value: any) {
        this._record = value;
        if (this._record) {
            this._record.properties = this._record.properties || {};
        }
    }
    get record() { return this._record; }
    @Input() hasDatatype = false;

    onTitleKeyup(value, record) {
        record.code = (record.isNew)
            ? value.replace(/[^\w]/gi, '').toLocaleLowerCase().slice(0, 15).toUpperCase()
            : record.code;
    }

    onAddOptionIfLast(idx) {
        if (this.record.options && (this.record.options.length - 1) === idx) {
            this.onAdd();
        }
    }
    onRemove = (idx) => this.record.options.splice(idx, 1);
    onAdd() {
        this.record.options = this.record.options || [];
        this.record.options.push({ isNew: true });
    }

    canUpdate() {
        if (!this.record.title || this.record.title.trim().length === 0) return false;
        if (this.hasDatatype && (!this.record.datatype || this.record.datatype.length === 0)) return false;

        if (this.record.datatype === DATATYPES.select) {
            if (!this.record.options || this.record.options.length === 0) return false;

            let result = true;
            this.record.options.forEach((r) => {
                if (!r.title || r.title.trim().length === 0) {
                    result = false;
                    return;
                }
            })
            if (!result) return false;
        }

        return true;
    }

    @Output() update = new EventEmitter<any>();
    onUpdate() {
        if (this.canUpdate()) {
            if (this.record.options) {
                this.record.options.forEach(option => option.isNew = undefined);
            }
            this.update.emit(this.record);
        }
    }

    @Output() cancel = new EventEmitter<any>();
    onCancel = () => this.cancel.emit();
}
