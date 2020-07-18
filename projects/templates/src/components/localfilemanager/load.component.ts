import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { LoadFileAction } from '../../+state/templates.actions';
import { TemplatesState } from '../../+state/templates.state';

@Component({
    selector: 'app-load-localfile',
    templateUrl: './load.component.html'
})
export class LoadLocalFileComponent {

    constructor(public store$: Store<TemplatesState>, public messageService: MessageService) {
    }

    handleFileInput(files: FileList) {
        const file = files && files.length === 1 ? files[0] : null;
        if (file) {
            this.getConfigurations(file)
                .then(
                    (content) => (content) ? this.store$.dispatch(new LoadFileAction({ filename: file.name, content })) : null,
                    (err) => this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })
                )
        }
    }
    async getConfigurations(file: File) {
        return new Promise<any>((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                try {
                    resolve(JSON.parse(event.target.result))
                } catch (ex) {
                    reject("Invalid file. System only supports ProductPurpose compliant JSON files.")
                }
            };
            reader.readAsText(file);
        });
    }
}
