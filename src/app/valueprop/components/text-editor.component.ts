import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { Key } from 'ts-key-enum';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html'
})
export class TextEditorComponent {
    @Output() notesChanged = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();
    @Output() toggleMode = new EventEmitter<any>();

    @Input() mode: string;
    @Input() placeholder: string;

    private _data: any;
    @Input() set data(value: any) {
        this._data = value;
        this.dataToEdit = _.clone(value);
    }
    get data() {
        return this._data;
    }

    dataToEdit: any;

    @HostListener('window:keydown', ['$event'])
    hotkeyHandler($event: any) {
        if ($event.key === Key.F2) {
            this.onToggleMode('EDIT');
            return false;
        } else if (($event.key === 's' || $event.key === 'S') && $event.ctrlKey && this.mode === 'EDIT') {
            this.onSave();
            return false;
        }
    }

    onSave = () => {
        this.dataToEdit.notes = this.data.notes;
        this.save.emit(this.dataToEdit);
    }
    onEscape(event) {
        event.preventDefault();
        event.stopPropagation();
        this.onToggleMode('VIEW');
    }

    onToggleMode = (mode) => this.toggleMode.emit({ mode, data: this.data });

    onListChange(args) {
        this.notesChanged.emit(args);
    }
}