import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { UserModelCommandTypes, UserModelCommandAction } from '../appcommon/lib/CommonActions';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';

@Component({
    selector: 'app-save-localfile',
    templateUrl: './save-localfile.component.html'
})
export class SaveLocalFileComponent implements OnInit, OnDestroy {
    loadedFile$: Subscription;
    content: any;
    @Input() filename = '';
    @Input() isDirty = false;

    constructor(public store$: Store<AppState>, public router: Router, public messageService: MessageService) {
    }
    ngOnInit(): void {
        this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
            .pipe(filter(file => file))
            .subscribe(file => {
                this.filename = (file.filename && file.filename.length > 0)
                    ? file.filename.split(".")[0]
                    : new Date().toISOString();

                this.filename = this.filename + '.json';
                this.content = (file.content) ? file.content : null;
            });
    }
    ngOnDestroy(): void {
        this.loadedFile$ ? this.loadedFile$.unsubscribe() : null;
    }

    filenameEditorVisible = false;
    toggleFilenameEditor = () => this.filenameEditorVisible = !this.filenameEditorVisible;

    canSave = () => this.filename && this.filename.trim().length > 0 && _.endsWith(this.filename.trim().toLowerCase(), '.json');

    onSave(saveLocally) {
        if (this.canSave()) {
            this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Save, data: { filename: this.filename, saveLocally } }));
        }
    }
    onReset() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Reset, data: this.content }));
    }
    onClose() {
        this.store$.dispatch(new UserModelCommandAction({ command: UserModelCommandTypes.Close }));
    }
}
