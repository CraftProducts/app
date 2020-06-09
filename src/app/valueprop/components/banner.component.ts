import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-valueprop-banner',
    templateUrl: './banner.component.html'
})
export class ValuePropBannerComponent {
    @Input() templates: any;
}