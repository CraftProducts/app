import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

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

    onRemove(index) {
        this.list.splice(index, 1);
    }

    onMoveup(index) {
        this.list[index].sequence = (this.list[index].sequence || 1) - 1;
        this.list[index - 1].sequence = (this.list[index - 1].sequence || 0) + 1;
    }
    onMovedown(index) {
        this.list[index].sequence = (this.list[index].sequence || 1) + 1;
        this.list[index + 1].sequence = (this.list[index + 1].sequence || 0) - 1;
    }

    recordToEdit: any;
    onEdit(index) {
        this.recordToEdit = _.cloneDeep(this.list[index]);
    }
    onCancelEdit() {
        this.recordToEdit = null;
    }
}
