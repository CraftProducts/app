import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-matrix',
    templateUrl: './matrix.component.html'
})
export class MatrixRendererComponent {
    @Input() section: any;
    @Output() showEditor = new EventEmitter<any>();

    isCustomizerVisible = false;
    
    onShowEditor(eventArgs) {
        this.showEditor.emit(eventArgs);
    }

    onShowItemDetails(section) {
        console.log('onShowItemDetails', section);
        this.section.selectedItem = section;
        this.onShowEditor({ mode: 'VIEW', section: this.section });
    }
}
