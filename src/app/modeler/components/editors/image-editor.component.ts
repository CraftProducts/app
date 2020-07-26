import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { BaseEditor } from './base-editor';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-image-editor',
    templateUrl: './image-editor.component.html'
})
export class ImageEditorComponent extends BaseEditor {
    @Input() placeholder: string;
    @Input() properties: any;
    resetNewRecord(): void { }

    constructor(public messageService: MessageService) {
        super();
    }

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

    onFileLoaded(fileContent) {
        this.dataToEdit.image = fileContent.content;
    }

    onFileLoadingError(err) {
        this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })
    }
}
