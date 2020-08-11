import { HostListener, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

export abstract class BaseEditor {
    @Output() itemChange = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();
    @Output() toggleMode = new EventEmitter<any>();
    isDirty = false;

    @Input() mode: string;
    @Input() selectedItem: any;

    private _data: any;
    @Input() set data(value: any) {
        this._data = value;
        this.initData();
    }
    private initData() {
        this.isDirty = false;
        this.dataToEdit = _.cloneDeep(this.data);
        this.selectedItem = null;
    }

    get data() {
        return this._data;
    }

    dataToEdit: any;
    newRecord: any;

    abstract resetNewRecord(): void
    abstract add(): void

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

    onToggleMode = (mode) => {
        if (mode === 'VIEW') {
            this.initData();
        }
        this.toggleMode.emit({ mode, data: this.data });
    }

    onSave = () => {
        this.add();
        this.isDirty = false;
        this.save.emit(this.dataToEdit);
    }

    onItemChanged(args) {
        this.itemChange.emit(args);
    }

    onSelectItem(item) {
        this.selectedItem = item;
    }
}