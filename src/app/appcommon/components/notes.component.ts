import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html'
})
export class NotesComponent {

    @Input() list: any;
    @Output() listChange = new EventEmitter<any>();

    isEditorVisible = false;
    newRecord: any;

    constructor() {
        this.resetNewRecord();
    }

    remove = (index) => {
        this.list.splice(index, 1);
        this.listChange.emit(this.list);
    }

    canAdd = () => this.newRecord && this.newRecord.note && this.newRecord.note.trim().length > 0;
    
    add() {
        if (this.canAdd()) {
            if (!this.list) {
                this.list = [];
            }
            this.list.push(_.clone(this.newRecord));
            this.resetNewRecord();
            this.listChange.emit(this.list);
        }
    }
    onCancel(event) {
        event.preventDefault();
        event.stopPropagation();
        this.resetNewRecord();
        this.isEditorVisible = false;
    }

    resetNewRecord() {
        this.newRecord = { timestamp: new Date(), note: '' };
    }
}