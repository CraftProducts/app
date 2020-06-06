import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-valueprop-editor',
    templateUrl: './editor.component.html'
})
export class ValuePropEditorComponent {
    @Output() sectionSelected = new EventEmitter<any>();

    @Output() dataChange = new EventEmitter<any>();
    private _data: any;
    @Input() set data(value: any) {
        this._data = value;
        this.extractSections(value);
    }
    get data() {
        return this._data;
    }

    @Input() mode: string;  // VIEW / EDIT

    private _section: any;
    @Input() set section(value: any) {
        value = value || {};
        value.data = value.data || {};
        this._section = value;
    }
    get section() {
        return this._section;
    }
    sections: any = [];

    extractSections(data) {
        if (!data) return;

        if (data.type === 'panel') {
            this.sections.push(_.pick(data, ['icon', 'code', 'title']));
        }
        if (data.children && data.children.length > 0) {
            data.children.forEach(child => this.extractSections(child));
        }
    }

    selectSection(sectionCode) {
        this.sectionSelected.emit(sectionCode);
    }

    onTextUpdated(updatedData, section) {
        section.data = updatedData;
        this.mode = 'VIEW';
    }

    onToggleMode(updatedMode) {
        this.mode = updatedMode;
    }
}