import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ModelerState } from '../../+state/modeler.state';
import { UpdateThemeAction } from 'src/app/appcommon/lib/CommonActions';

const DEFAULT_RECORD = { bgColor: '#ffffff', color: '#555555', tile: { bgColor: '#fff9b8', color: '#555555' } };
const DEFAULT_THEME = {
    panels: [
        { bgColor: '#8000FF', color: '#ffffff', tile: { bgColor: '#fff9b8', color: '#555555' } },
        { bgColor: '#000080', color: '#ffffff', tile: { bgColor: '#fff9b8', color: '#555555' } }
    ],
    matrix: [
        { bgColor: '#0EBCB8', color: '#ffffff', tile: { bgColor: '#fff9b8', color: '#555555' } },
        { bgColor: '#FDC147', color: '#000000', tile: { bgColor: '#fff9b8', color: '#555555' } }
    ]
};

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html'
})
export class ThemeEditorComponent {
    themeToEdit: any;
    _theme: any
    @Input() set theme(value: any) {
        this._theme = value || DEFAULT_THEME;
        this.onReset();
    }
    get theme() {
        return this._theme;
    }
    @Output() close = new EventEmitter<any>();

    constructor(public store$: Store<ModelerState>) { }

    onClose = () => this.close.emit();

    onReset = () => this.themeToEdit = _.cloneDeep(this._theme);

    onSave() {
        this.store$.dispatch(new UpdateThemeAction(this.themeToEdit));
        this.theme = _.cloneDeep(this.themeToEdit);
    }
}
