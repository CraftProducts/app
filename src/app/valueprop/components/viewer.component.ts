import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectSectionAction } from '../+state/valueprop.actions';
import { Subscription } from 'rxjs';
import { ComponentCanDeactivate } from 'shared-lib'
import { BaseTemplateViewer } from '../../appcommon/components/base-template-viewer';
import { SetModelAction, SetModelDirtyAction } from 'src/app/appcommon/lib/CommonActions';
import { extractSections } from '../valueprop-utils';

@Component({
    selector: 'app-valueprop-viewer',
    templateUrl: './viewer.component.html'
})
export class ValuePropViewerComponent extends BaseTemplateViewer implements ComponentCanDeactivate, OnInit, OnDestroy {

    public zoom = 100;
    editorVisible = false;
    mode = "VIEW";

    selectedSection$: Subscription;
    section: string;

    params$: Subscription;

    model$: Subscription;
    model: boolean;

    constructor(public store$: Store<ValuePropState>, public router: Router, public activatedRoute: ActivatedRoute) {
        super(store$, router, activatedRoute);
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (!this.canDeactivate()) {
            $event.returnValue =
                'WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.';
        }
    }
    canDeactivate = () => !this.isModelDirty;

    ngOnInit() {
        this.subscribeTemplates();

        this.model$ = this.store$.select(p => p.valueProp.modelInstance)
            .subscribe(model => this.model = model);

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
    }

    onTemplatesLoaded(template, dataset): void {
        this.store$.dispatch(new SetModelAction({ template, dataset }));
    }

    ngOnDestroy(): void {
        this.unsubscribeTemplates();
        this.params$ ? this.params$.unsubscribe() : null;
        this.selectedSection$ ? this.selectedSection$.unsubscribe() : null;
    }

    onExtractSections(modelInstance: any, fieldlist: any, sections: any): void {
        extractSections(modelInstance, fieldlist, sections);
    }

    onHide() {
        this.store$.dispatch(new SelectSectionAction(null));
    }
    onSectionSelected(sectionCode) {
        const selected = this.searchSectionInLayout(this.loadedTemplate, sectionCode);
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
    onSectionUpdated(section) {
        if (section.isDirty) {
            this.store$.dispatch(new SetModelDirtyAction(section.isDirty));
        }
    }
}
