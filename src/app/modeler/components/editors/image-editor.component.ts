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
        console.log('fileContent', fileContent);
        this.dataToEdit.image = fileContent.content;
        console.log('this.dataToEdit.image', this.dataToEdit.image);
        //this.store$.dispatch(new LoadFileAction(fileContent));
    }

    onFileLoadingError(err) {
        console.log(err);
        this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })
    }

    getDataUrl(img) {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Set width and height
        canvas.width = img.width;
        canvas.height = img.height;
        // Draw the image
        ctx.drawImage(img, 0, 0);
        return canvas.toDataURL('image/jpeg');
    }
}
