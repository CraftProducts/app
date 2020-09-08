import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import * as _ from 'lodash-es';
import { IBACKEND_URLS, BackendUrl } from 'shared-lib';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html'
})
export class IntroductionComponent {

    templateFileLocation = "";

    @Input() sections = [];
    @Input() model: any;

    @Output() close = new EventEmitter<any>();
    onClose = () => this.close.emit();

    @Output() proceed = new EventEmitter<any>();
    onProceed = (sectionCode) => this.proceed.emit(sectionCode);

    constructor(@Inject(IBACKEND_URLS) backendUrls: BackendUrl[]) {
        const found = _.find(backendUrls, { key: 'templates' })
        this.templateFileLocation = (found) ? `${found.value}` : '';
    }
}