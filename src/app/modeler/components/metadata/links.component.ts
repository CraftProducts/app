import { Component, Input, EventEmitter, Output, HostListener } from '@angular/core';
import * as _ from 'lodash-es';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html'
})
export class LinksComponent {

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

    canAdd = () => this.newRecord && this.newRecord.title && this.newRecord.title.trim().length > 0 &&
        this.newRecord.url && this.newRecord.url.trim().length > 0;

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
        this.newRecord = { title: '', url: '' };
    }

    editItem(item) {
        item.editing = true;
        item.memento = _.pick(item, ['title', 'url']);
        this.isEditorVisible = false;
    }

    updateItem(item) {
        item.editing = false;
    }

    cancelUpdatingItem(event, item) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        item.editing = false;
        item.title = item.memento.title;
        item.url = item.memento.url;
    }

    showAddEditor() {
        this.isEditorVisible = true;
        if (this.list && this.list.length > 0) {
            this.list.forEach(link => link.editing = false);
        }
    }
}