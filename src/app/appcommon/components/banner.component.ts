import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html'
})
export class BannerComponent {
    @Input() templateDetails: any;
    isCollapsed = true;
}