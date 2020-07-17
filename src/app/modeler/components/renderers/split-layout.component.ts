import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-split-layout',
    templateUrl: './split-layout.component.html'
})
export class SplitLayoutRendererComponent {
    @Input() layout: any;
    @Output() showEditor = new EventEmitter<any>();

    onShowEditor(eventArgs) {
        this.showEditor.emit(eventArgs);
    }
}