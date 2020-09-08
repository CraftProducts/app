import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-record-editor',
    templateUrl: './record-editor.component.html'
})
export class RecordEditorComponent {
    private _item: any;
    @Input() set item(value: any) {
        this._item = value;
        this.selectedTab = 1;
    }
    get item() {
        return this._item;
    }

    @Input() showDelete: boolean;
    @Output() itemChange = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    selectedTab = 1;

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

    onListChange() {
        this.itemChange.emit(this.item);
    }

    onDelete() {
        this.delete.emit(this.item);
    }
}