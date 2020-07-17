import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-freeflow-layout',
    templateUrl: './freeflow-layout.component.html'
})
export class FreeflowLayoutRendererComponent {
    @Input() layout: any;
    @Output() showEditor = new EventEmitter<any>();

    onShowEditor(eventArgs) {
        this.showEditor.emit(eventArgs);
    }
}