import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html'
})
export class ListEditorComponent {
    @Output() save = new EventEmitter<any>();
    @Output() toggleMode = new EventEmitter<any>();

    @Input() mode: string;

    private _data: any;
    @Input() set data(value: any) {
        this._data = value;
        this.dataToEdit = _.clone(value);
    }
    get data() {
        return this._data;
    }

    dataToEdit: any;
    newRecord: any;

    constructor() {
        this.resetNewRecord();
    }
    onSave = () => this.save.emit(this.dataToEdit);
    onCancel(event) {
        console.log(event);
        event.preventDefault();
        event.stopPropagation();
        this.onToggleMode('VIEW');
    }
    onToggleMode = (mode) => this.toggleMode.emit(mode);

    remove = (index) => this.dataToEdit.list.splice(index, 1);

    canAdd = () => this.newRecord && this.newRecord.trim().length > 0;
    add() {
        if (this.canAdd()) {
            if (!this.dataToEdit.list) {
                this.dataToEdit.list = [];
            }
            this.dataToEdit.list.push(_.clone(this.newRecord));
            this.resetNewRecord();
        }
    }

    resetNewRecord() {
        this.newRecord = '';
    }
}