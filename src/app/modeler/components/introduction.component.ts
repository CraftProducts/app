import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { extractSections } from '../modeler-utils';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html'
})
export class IntroductionComponent {
    @Input() sections = [];
    @Input() model: any;

    @Output() close = new EventEmitter<any>();
    onClose = () => this.close.emit();
}