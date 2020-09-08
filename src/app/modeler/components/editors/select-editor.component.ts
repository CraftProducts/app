import { Component, Input } from '@angular/core';
import { BaseEditor } from './base-editor';

@Component({
    selector: 'app-select-editor',
    templateUrl: './select-editor.component.html'
})
export class SelectEditorComponent extends BaseEditor {
    @Input() options: any;
    
    resetNewRecord(): void { }

    add(): void {
        this.dataToEdit.notes = this.data.notes;
        this.dataToEdit.links = this.data.links;
        this.dataToEdit.tasks = this.data.tasks;
    }

    onEscape(event) {
        event.preventDefault();
        event.stopPropagation();
        this.onToggleMode('VIEW');
    }
}