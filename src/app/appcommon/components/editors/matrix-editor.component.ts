import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { generateCode } from 'shared-lib';

@Component({
    selector: 'app-matrix-editor',
    templateUrl: './matrix-editor.component.html'
})
export class MatrixEditorComponent {
    @Output() itemChange = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();
    @Output() toggleMode = new EventEmitter<any>();

    @Input() mode: string;
    @Input() selectedItem = { rowCode: null, colCode: null, summary: null, data: null, datatype: null };

    @Input() section: any;

    private _data: any;
    @Input() set data(value: any) {
        this._data = value;
        this.dataToEdit = _.cloneDeep(value);
        this.selectedItem = null;
    }
    get data() {
        return this._data;
    }

    dataToEdit: any;
    newRecord: any;

    constructor() {
        this.resetNewRecord();
    }

    onSave = () => {
        this.add();
        this.save.emit(this.dataToEdit);
    }

    onToggleMode = (mode) => {
        if (mode === 'VIEW') {
            this.selectedItem = null;
        }
        this.toggleMode.emit({ mode, data: this.data });
    }

    remove = (index) => this.dataToEdit.list.splice(index, 1);

    canAdd = () => this.newRecord && this.newRecord.title && this.newRecord.title.trim().length > 0;
    add() {
        if (this.canAdd()) {
            if (!this.dataToEdit.list) {
                this.dataToEdit.list = [];
            }
            this.dataToEdit.list.push(_.clone(this.newRecord));
            this.resetNewRecord();
        }
    }
    onCancel(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.newRecord.title.trim().length === 0) {
            this.onToggleMode('VIEW');
        }
        this.resetNewRecord();
    }

    resetNewRecord() {
        this.newRecord = { sequence: 0, title: '', code: generateCode(10), notes: [], links: [] };
    }

    onSelectItem(item) {
        this.selectedItem = item;
    }

    onItemChanged(args) {
        this.itemChange.emit(args);
    }

    onDelete(item) {
        if (this.data && this.data.list) {
            const removed = _.remove(this.data.list, { code: item.code });
            if (removed && removed.length > 0) {
                this.selectedItem = null;
                this.save.emit(this.data);
            }
        }
    }
}