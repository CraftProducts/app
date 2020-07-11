import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { extractSections } from '../valueprop-utils';

@Component({
    selector: 'app-valueprop-editor',
    templateUrl: './editor.component.html'
})
export class ValuePropEditorComponent {
    @Output() close = new EventEmitter<any>();
    @Output() sectionSelected = new EventEmitter<any>();

    @Output() update = new EventEmitter<any>();
    private _data: any;
    @Input() set data(value: any) {
        this._data = value;
        this.sections = [];
        extractSections(value, ['icon', 'code', 'title'], this.sections);
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

    selectSection = (sectionCode) => this.sectionSelected.emit(sectionCode);

    onUpdated(updatedData, section) {
        section.data = updatedData;
        section.isDirty = true;
        this.update.emit(section);
        this.mode = 'VIEW';
    }

    onToggleMode(updated, section) {
        this.mode = updated.mode;
        section.data = updated.data;
        this.update.emit(section);
    }

    onItemChanged(item, section) {
        section.isDirty = true;
        this.update.emit(section);
    }
    closeEditor() {
        this.close.emit(null);
    }
}
