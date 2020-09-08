import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-editors',
    templateUrl: './editors.component.html'
})
export class EditorsComponent {
    @Input() section: any;
    @Input() mode: string;  // VIEW / EDIT

    @Output() toggleMode = new EventEmitter<any>();
    @Output() save = new EventEmitter<any>();
    @Output() itemSelected = new EventEmitter<any>();

    onToggleMode = (args) => this.toggleMode.emit(args)
    onUpdated = (args) => this.save.emit(args)
    onItemSelected = (args) => this.itemSelected.emit(args)
}