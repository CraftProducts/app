import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-layout-renderer',
    templateUrl: './layout-renderer.component.html'
})
export class LayoutRendererComponent {
    @Input() layout: any;
    memento: any;
    editPanel(child) {
        this.memento = _.clone(child);
        child.edit = true;
        console.log('editPanel', child);
    }

    saveChanges(child) {
        child.edit = false;
        console.log('savePanel', child);
    }
    cancelChanges(child) {
        //child = _.clone(this.memento);
        child.edit = false;
        console.log('cancelPanel', child);
    }

    expandPanel(child) {
        console.log('expandPanel', child);
    }
}