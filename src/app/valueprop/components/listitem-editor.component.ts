import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { Key } from 'ts-key-enum';

@Component({
    selector: 'app-listitem-editor',
    templateUrl: './listitem-editor.component.html'
})
export class ListitemEditorComponent {
    @Input() item: any;
    @Output() itemChange = new EventEmitter<any>();

    onListChange(args) {
        this.itemChange.emit(this.item);
    }
}