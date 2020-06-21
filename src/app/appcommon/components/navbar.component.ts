import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    @Input() version: string;
    @Input() currentTemplate: any;
    @Input() templates: any;
    @Input() landingUrl: string;
    @Input() title: string;
    @Input() purposeTitle: string;
    @Input() isModelDirty: boolean;

    @Output() closeWorkspace = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();
    @Output() reset = new EventEmitter<any>();

    isCollapsed = true;

    onCloseWorkspace = () => this.closeWorkspace.emit(null);
    onSave = () => this.save.emit(null);
    onReset = () => this.reset.emit(null);

}