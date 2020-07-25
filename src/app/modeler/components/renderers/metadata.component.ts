import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-metadata',
    templateUrl: './metadata.component.html'
})
export class MetadataRendererComponent {
    @Input() data: any;
}