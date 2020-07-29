import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

const DEFAULT_RECORD = { bgColor: '#ffffff', color: '#555555', tile: { bgColor: '#fff9b8', color: '#555555' } };

@Component({
    selector: 'app-theme-list-editor',
    templateUrl: './theme-list-editor.component.html'
})
export class ThemeListEditorComponent {
    @Input() title: any;
    @Input() list: any;
    onRemove(index) {
        this.list.splice(index, 1);
    }
    onAdd() {
        this.list.push(DEFAULT_RECORD)
    }
}
