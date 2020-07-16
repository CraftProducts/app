import { HostListener, Output, EventEmitter, Input } from '@angular/core';
import * as _ from 'lodash';

export abstract class BaseEditor {
    @Output() itemChange = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();
    @Output() toggleMode = new EventEmitter<any>();

    @Input() mode: string;
    @Input() selectedItem: any;

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
            this.selectedItem = null;
        }
        this.toggleMode.emit({ mode, data: this.data });
    }

    onSave = () => {
        this.add();
        this.save.emit(this.dataToEdit);
    }

    onItemChanged(args) {
        this.itemChange.emit(args);
    }

    onSelectItem(item) {
        this.selectedItem = item;
    }
}