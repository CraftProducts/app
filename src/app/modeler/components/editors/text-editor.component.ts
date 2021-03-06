import { Component, Input } from '@angular/core';
import { BaseEditor } from './base-editor';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html'
})
export class TextEditorComponent extends BaseEditor {
    @Input() placeholder: string;
    resetNewRecord(): void { }

    add(): void {
        this.dataToEdit.notes = this.data.notes;
        this.dataToEdit.links = this.data.links;
        this.dataToEdit.tasks = this.data.tasks;
    }
}
