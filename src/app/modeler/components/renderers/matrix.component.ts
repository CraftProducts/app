import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash-es';
import { DATATYPES } from '../../modeler-utils';
import { transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-matrix',
    templateUrl: './matrix.component.html',
    styleUrls: ['./matrix.css']
})
export class MatrixRendererComponent {
    @Output() itemChange = new EventEmitter<any>();
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
        this.section.data = this.section.data || [];

        const src = _.find(this.section.data, { rowCode: event.previousContainer.data.rowCode, colCode: event.previousContainer.data.colCode })
        let dest = _.find(this.section.data, { rowCode: event.container.data.rowCode, colCode: event.container.data.colCode });

        if (!dest) {
            dest = _.cloneDeep(event.container.data);
            dest.data.list = [];
            this.section.data.push(dest);
        }
        dest.data.list = dest.data.list || [];
        transferArrayItem(src.data.list, dest.data.list, event.previousIndex, event.currentIndex);

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            event.container.data.data.list = event.container.data.data.list || [];
            transferArrayItem(event.previousContainer.data.data.list,
                event.container.data.data.list,
                event.previousIndex,
                event.currentIndex);
        }
        event.container.data.isDirty = true;
        this.itemChange.emit(this.section);
    }
}
