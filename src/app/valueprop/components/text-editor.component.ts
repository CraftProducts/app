import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html'
})
export class TextEditorComponent {
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

    onSave = () => this.save.emit(this.dataToEdit);
    onToggleMode = (mode) => this.toggleMode.emit(mode);
}