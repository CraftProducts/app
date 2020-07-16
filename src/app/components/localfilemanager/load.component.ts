import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LoadFileAction } from '../../+state/app.actions';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'app-load-localfile',
    templateUrl: './load.component.html'
})
export class LoadLocalFileComponent implements OnInit, OnDestroy {

    loadedFile$: Subscription;

    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }
    ngOnInit(): void {
        this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
            .pipe(filter(file => file && file.content))
            .subscribe(file => this.router.navigate([file.content.groupCode, file.content.templateCode], { queryParams: { mode: 'file' } }));
    }
    ngOnDestroy(): void {
        this.loadedFile$ ? this.loadedFile$.unsubscribe() : null;
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
