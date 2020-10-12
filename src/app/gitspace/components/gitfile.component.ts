import { Component, OnDestroy, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as _ from 'lodash-es';
import { GitspaceState } from '../+state/gitspace.state';
import { ResetGitspaceArtifactAction } from '../+state/gitspace.actions';

@Component({
    selector: 'app-gitfile',
    templateUrl: './gitfile.component.html'
})
export class GitFileComponent implements OnInit, OnDestroy {
    gitFile$: Subscription;
    content: any;
    filename = '';

    @Input() isDirty = false;

    @Output() reset = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();

    constructor(public store$: Store<GitspaceState>, public router: Router, public messageService: MessageService) {
    }
    ngOnInit(): void {
        this.gitFile$ = this.store$.select(p => p.gitspace.loadedFile)
            .subscribe(file => {
                this.filename = file ? file.filename : null;
                this.content = file && file.content ? file.content : null;
            });
    }
    ngOnDestroy(): void {
        this.gitFile$ ? this.gitFile$.unsubscribe() : null;
    }

    filenameEditorVisible = false;
    toggleFilenameEditor = () => this.filenameEditorVisible = !this.filenameEditorVisible;

    canSave = () => this.isDirty &&
        this.filename && this.filename.trim().length > 0 && _.endsWith(this.filename.trim().toLowerCase(), '.json');

    onSave = () => this.canSave() ? this.save.emit(null) : null;
    onReset = () => {
        this.store$.dispatch(new ResetGitspaceArtifactAction(null));
        this.reset.emit(this.content);
    }
    onClose = () => this.close.emit(null);
}
