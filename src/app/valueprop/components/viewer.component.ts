import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LoadTemplateAction, SelectSectionAction } from '../+state/valueprop.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-valueprop-viewer',
    templateUrl: './viewer.component.html'
})
export class ValuePropViewerComponent implements OnInit, OnDestroy {
    editorVisible = false;
    mode = "VIEW";
    section: string;

    currentTemplate$: Subscription;
    selectedSection$: Subscription;
    params$: Subscription;

    constructor(public store$: Store<ValuePropState>, public activatedRoute: ActivatedRoute) {
    }

    layout: any;

    ngOnInit() {
        this.params$ = this.activatedRoute.params
            .pipe(filter(p => p && p["template"] && p["template"].length > 0), map(p => p["template"]))
            .subscribe(template => this.store$.dispatch(new LoadTemplateAction(template)));

        this.selectedSection$ = this.store$.select(p => p.valueProp.selectedSection)
            .subscribe(selectedSection => {
                if (selectedSection) {
                    this.mode = selectedSection.mode;
                    this.section = selectedSection.section;
                    this.editorVisible = true;
                } else {
                    this.editorVisible = false;
                }
            });

        this.currentTemplate$ = this.store$.select(p => p.valueProp.currentTemplate)
            .pipe(filter(template => template))
            .subscribe(template => this.layout = template);
    }
    ngOnDestroy(): void {
        this.params$ ? this.params$.unsubscribe() : null;
        this.selectedSection$ ? this.selectedSection$.unsubscribe() : null;
        this.currentTemplate$ ? this.currentTemplate$.unsubscribe() : null;
    }

    onHide() {
        this.store$.dispatch(new SelectSectionAction(null));
    }
    onSectionSelected(sectionCode) {
        const selected = this.searchSectionInLayout(this.layout, sectionCode);                
        this.store$.dispatch(new SelectSectionAction({ mode: this.mode, section: selected }));
    }
    searchSectionInLayout(layout, sectionCode) {
        if (layout) {
            if (layout.type === 'panel' && layout.code.toUpperCase() === sectionCode.toUpperCase()) {
                return layout;
            } else if (layout.children && layout.children.length > 0) {
                let result = null;
                for (let i = 0; result == null && i < layout.children.length; i++) {
                    result = this.searchSectionInLayout(layout.children[i], sectionCode)
                }
                return result;
            }
        }
        return null;
    }

}
