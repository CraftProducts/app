import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-matrix',
    templateUrl: './matrix.component.html'
})
export class MatrixRendererComponent {
    _section: any
    @Input() set section(value: any) {
        console.log('value', value);
        this._section = value;
    }
    get section(): any {
        return this._section;
    }
    @Output() showEditor = new EventEmitter<any>();

    onShowEditor(eventArgs) {
        this.showEditor.emit(eventArgs);
    }

    onShowItemDetails(section) {
        this.section.selectedItem = section;// this.getSection(row, col);
        console.log('this.section.selectedItem', this.section.selectedItem);
        this.onShowEditor({ mode: 'VIEW', section: this.section });
    }

    // getSection(row, col) {
    //     const subSection = {
    //         rowCode: row.code,
    //         colCode: col.code,
    //         datatype: row.datatype,
    //         options: row.options,
    //         data: null
    //     }
    //     this.section.data = this.section.data || [];
    //     const found = _.find(this.section.data, { rowCode: row.code, colCode: col.code });
    //     subSection.data = (found) ? found.data : { text: '', list: [], selectedValue: '' };

    //     return subSection;
    // }
}
