import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { ModelerState } from '../../+state/modeler.state';
import { CustomizeSectionAction } from '../../+state/modeler.actions';
import { Store } from '@ngrx/store';
import { DATATYPES } from '../../modeler-utils';

@Component({
    selector: 'app-matrix',
    templateUrl: './matrix.component.html',
    styleUrls: ['./matrix.css']
})
export class MatrixRendererComponent {
    sectionCodes = [];

    _section: any;
    @Input() set section(value: any) {
        this._section = value;
        this.sectionCodes = [];

        const colcodes = (value && value.columns) ? _.map(value.columns, 'code') : [];
        const rowcodes = (value && value.rows) ? _.map(_.filter(value.rows, { datatype: DATATYPES.list }), 'code') : [];

        colcodes.forEach(col => rowcodes.forEach(row => this.sectionCodes.push(`${col}_${row}`)))
    }
    get section() { return this._section; }

    @Output() showEditor = new EventEmitter<any>();
    onShowEditor = (eventArgs) => this.showEditor.emit(eventArgs);

    onShowItemDetails(section) {
        this.onShowEditor({ mode: 'VIEW', section: this.section, rowCode: section.rowCode, colCode: section.colCode });
    }

    onDrop(event) {
        console.info('section', this.section);
        console.info('previousContainer.data', event.previousContainer.data);
        console.info('container.data', event.container.data);
        console.info('previousIndex', event.previousIndex);
        console.info('currentIndex', event.currentIndex);
    }
}
