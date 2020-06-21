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

    editing = false;
    memento = '';
    edit() {
        this.editing = true;
        this.memento = this.item.summary;
    }

    update() {
        this.editing = false;
        this.itemChange.emit(this.item);
    }

    cancelUpdating(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.editing = false;
        this.item.summary = this.memento;        
    }

    onListChange(args) {
        this.itemChange.emit(this.item);
    }
}