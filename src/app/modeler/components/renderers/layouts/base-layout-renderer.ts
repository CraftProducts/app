import { Input, Output, EventEmitter } from '@angular/core';

export abstract class BaseLayoutRenderer {
    @Input() layout: any;

    @Output() showEditor = new EventEmitter<any>();
    onShowEditor = (eventArgs) => this.showEditor.emit(eventArgs);

    @Output() itemChange = new EventEmitter<any>();
    onItemChange = (section) => {
        section.isDirty = true;
        this.itemChange.emit(section);
    }
}
