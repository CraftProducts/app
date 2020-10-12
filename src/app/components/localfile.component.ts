import { Component, OnDestroy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/app.state';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';

@Component({
    selector: 'app-localfile',
    templateUrl: './localfile.component.html'
})
export class LocalFileComponent implements OnInit, OnDestroy {
    loadedFile$: Subscription;
    content: any;
    @Input() filename = '';
    @Input() isDirty = false;

    @Output() reset = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();

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

    canSave = () => this.isDirty &&
        this.filename && this.filename.trim().length > 0 && _.endsWith(this.filename.trim().toLowerCase(), '.json');

    onSave = () => this.canSave() ? this.save.emit(this.content) : null;
    onReset = () => this.reset.emit(this.content);
    onClose = () => this.close.emit(null);
}
