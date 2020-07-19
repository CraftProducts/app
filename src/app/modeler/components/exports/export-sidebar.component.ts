import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { createPptx } from './pptx-util';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-export-sidebar',
    templateUrl: './export-sidebar.component.html'
})
export class ExportSidebarComponent implements OnInit {
    @Input() model: any;
    @Input() filename: string;
    @Output() close = new EventEmitter<any>();

    options: any;

    ngOnInit(): void {
        console.log('this.model', this.model);
        this.options = {
            appTitle: environment.appTitle,
            filename: this.filename || this.model.code,
            theme: 'default',
            includeMainSlide: true,
            mainSlide: {
                title: this.model.title,
                summary: this.model.summary,
                author: environment.appTitle
            },
            includeEmptySections: true,
            includePaging: true,
            includeNotes: true
        };
    }

    onClose = () => this.close.emit();

    exportToPptx() {
        createPptx(this.model, this.options)
    }
}
