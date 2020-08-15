import { Component, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { DATATYPES, SECTIONTYPES } from '../../modeler-utils';

@Component({
    selector: 'app-section-editor',
    templateUrl: './section-editor.component.html'
})
export class SectionEditorComponent {
    @Output() close = new EventEmitter<any>();
    @Output() sectionSelected = new EventEmitter<any>();

    @Output() update = new EventEmitter<any>();

    @Input() sections: any;
    @Input() data: string;

    @Input() mode: string;  // VIEW / EDIT

    recordDataToEdit: any;
    prevSection: any;
    nextSection: any;
    private _section: any;
    @Input() set section(value: any) {
        value = value || {};
        value.data = value.data || {};
        this._section = value;
        this.recordDataToEdit = (value.datatype === DATATYPES.list || value.type === SECTIONTYPES.matrix) ? null : value;

        if (this.sections) {
            const index = _.findIndex(this.sections, { code: value.code });
            this.prevSection = (index > 0) ? this.sections[index - 1] : null;
            this.nextSection = (index < this.sections.length - 1) ? this.sections[index + 1] : null;
        }
    }
    get section() {
        return this._section;
    }
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
        console.error('onItemChanged', item, section);
        section.isDirty = true;
        this.update.emit(section);
    }
    closeEditor() {
        this.close.emit(null);
    }

    onItemSelected(data) {
        console.log('onItemSelected', data);
        this.recordDataToEdit = { data };
    }
}
