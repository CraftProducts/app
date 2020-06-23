import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html'
})
export class ListEditorComponent {
    @Output() itemChange = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();
    @Output() toggleMode = new EventEmitter<any>();

    @Input() mode: string;
    @Input() selectedItem: any;

    private _data: any;
    @Input() set data(value: any) {
        this._data = value;
        this.dataToEdit = _.cloneDeep(value);
    }
    get data() {
        return this._data;
    }

    dataToEdit: any;
    newRecord: any;

    constructor() {
        this.resetNewRecord();
    }
    @HostListener('window:keydown', ['$event'])
    hotkeyHandler($event: any) {
        if ($event.code === 'F2') {
            this.onToggleMode('EDIT');
            return false;
        } else if ($event.code === 'KeyS' && $event.ctrlKey && this.mode === 'EDIT') {
            this.onSave();
            return false;
        }
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
        this.newRecord = { sequence: 0, title: '', notes: [] };
    }

    onSelectItem(item) {
        this.selectedItem = item;
    }

    onItemChanged(args) {
        this.itemChange.emit(args);
    }
}