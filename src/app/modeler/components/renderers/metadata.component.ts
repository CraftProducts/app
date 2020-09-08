import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-metadata',
    templateUrl: './metadata.component.html'
})
export class MetadataRendererComponent {
    @Input() data: any;
}