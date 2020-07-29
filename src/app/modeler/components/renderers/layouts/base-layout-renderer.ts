import { Input, Output, EventEmitter } from '@angular/core';

export abstract class BaseLayoutRenderer {
    @Input() layout: any;
    @Output() showEditor = new EventEmitter<any>();

    onShowEditor(eventArgs) {
        this.showEditor.emit(eventArgs);
    }
}
