import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-matrix-list-customizer',
    templateUrl: './matrix-list-customizer.component.html'
})
export class MatrixListCustomizerComponent {
    @Input() list: any;
    @Output() listChange = new EventEmitter<any>();

    @Input() hasDatatype = false;

    getOrderedList = () => {
        this.list = _.sortBy(this.list, 'sequence');
        return this.list;
    }

    onRemove = (index) => this.list.splice(index, 1);

    onMoveup(index) {
        this.list[index].sequence = (this.list[index].sequence || 1) - 1;
        this.list[index - 1].sequence = (this.list[index - 1].sequence || 0) + 1;
    }
    onMovedown(index) {
        this.list[index].sequence = (this.list[index].sequence || 1) + 1;
        this.list[index + 1].sequence = (this.list[index + 1].sequence || 0) - 1;
    }

    recordToEdit: any;
    @Output() editingRecord = new EventEmitter<any>();
    onEdit(index) {
        this.recordToEdit = _.cloneDeep(this.list[index]);
        this.editingRecord.emit(this.recordToEdit);
    }

    onAdd() {
        this.list = this.list || [];
        this.list.push({ isNew: true, sequence: this.list.length + 1, title: '', datatype: DATATYPES.text });
        this.onEdit(this.list.length - 1);
    }
    onUpdateEdit(args) {
        const index = args.isNew ? this.list.length - 1 : _.findIndex(this.list, { code: args.code });
        args.isNew = undefined;
        this.list[index] = _.cloneDeep(args);

        this.recordToEdit = null;
        this.editingRecord.emit(null);
        this.listChange.emit(this.list);
    }
    onCancelEdit() {
        this.recordToEdit = null;
        this.editingRecord.emit(null);
    }
}
