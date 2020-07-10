import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { UserModelCommandTypes, UserModelCommandAction } from '../appcommon/lib/CommonActions';
import { MessageService } from 'primeng/api';
import { LoadFileAction } from '../+state/app.actions';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

    loadedFile$: Subscription;
    content: any;
    filename = '';

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    isCollapsed = true;
    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }
    ngOnInit(): void {
        this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
            .pipe(filter(file => file))
            .subscribe(file => {
                this.filename = file.filename;
                if (file.content) {
                    this.content = file.content;
                    this.router.navigate([this.content.groupCode, this.content.templateCode], { queryParams: { mode: 'file' } });
                }
            });

        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);
    }
    ngOnDestroy(): void {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
    }

    filenameEditorVisible = false;
    toggleFilenameEditor = () => this.filenameEditorVisible = !this.filenameEditorVisible;

    canSave = () => this.filename && this.filename.trim().length > 0 && _.endsWith(this.filename.trim().toLowerCase(), '.json');

    onSave() {
        if (this.canSave()) {
            this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Save, data: this.filename }));
        }
    }
    onReset() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Reset, data: this.content }));
    }

    handleFileInput(files: FileList) {
        const file = files && files.length === 1 ? files[0] : null;
        if (file) {
            this.filename = file.name;
            this.getConfigurations(file)
                .then(
                    (content) => {
                        (content) ? this.store$.dispatch(new LoadFileAction({ filename: this.filename, content })) : null;
                    },
                    (err) => this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })
                )
        }
    }
    async getConfigurations(file: File) {
        return new Promise<any>((resolve, reject) => {
            var reader = new FileReader();

            reader.onload = (event: any) => {
                var data = event.target.result;
                try {
                    resolve(JSON.parse(data))
                } catch (ex) {
                    reject("Invalid file. System only supports ProductPurpose compliant JSON files.")
                }
            };
            reader.readAsText(file);
        });
    }

}
