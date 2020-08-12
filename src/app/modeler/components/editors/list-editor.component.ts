import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { generateCode } from 'shared-lib';
import { BaseEditor } from './base-editor';

@Component({
    selector: 'app-list-editor',
    templateUrl: './list-editor.component.html'
})
export class ListEditorComponent extends BaseEditor {
    remove = (index) => this.dataToEdit.list.splice(index, 1);

    canAdd = () => this.newRecord && this.newRecord.title && this.newRecord.title.trim().length > 0;
    add() {
        if (this.canAdd()) {
            if (!this.dataToEdit.list) {
                this.dataToEdit.list = [];
            }
            this.dataToEdit.list.push(_.clone(this.newRecord));
            this.resetNewRecord();
        }
    }
    onCancel(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.newRecord.title.trim().length === 0) {
            this.onToggleMode('VIEW');
        }
        this.resetNewRecord();
    }

    resetNewRecord() {
        this.newRecord = { sequence: 0, title: '', code: generateCode(10), notes: [], links: [], tasks: [] };
    }

    onDelete(item) {
        if (this.data && this.data.list) {
            const removed = _.remove(this.data.list, { code: item.code });
            if (removed && removed.length > 0) {
                this.save.emit(this.data);
                this.itemSelected.emit(null);
            }
        }
    }
}
