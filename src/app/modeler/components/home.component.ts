import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ModelerState } from '../+state/modeler.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComponentCanDeactivate, UNLOAD_WARNING_MESSAGE } from 'shared-lib'
import { SetModelAction, SetModelDirtyAction, SelectSectionAction } from 'src/app/appcommon/lib/CommonActions';
import { extractSections, SECTIONTYPES } from '../modeler-utils';
import { BaseTemplateViewer } from './base-template-viewer';

@Component({
    selector: 'app-modeler-home',
    templateUrl: './home.component.html'
})
export class ModelerHomeComponent extends BaseTemplateViewer implements ComponentCanDeactivate, OnInit, OnDestroy {

    public zoom = 100;
    editorVisible = false;
    mode = "VIEW";

    selectedSection$: Subscription;
    section: string;

    params$: Subscription;

    model$: Subscription;
    model: any;

    constructor(public store$: Store<ModelerState>, public router: Router, public activatedRoute: ActivatedRoute) {
        super(store$, router, activatedRoute);
    }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (!this.canDeactivate()) {
            $event.returnValue = UNLOAD_WARNING_MESSAGE;
        }
    }
    canDeactivate = () => !this.isModelDirty;

    ngOnInit() {
        this.subscribeTemplates();

        this.model$ = this.store$.select(p => p.modeler.modelInstance)
            .subscribe(model => this.model = model);

        this.selectedSection$ = this.store$.select(p => p.modeler.selectedSection)
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

    onShowEditor(eventArgs) {
        this.store$.dispatch(new SelectSectionAction(eventArgs));
    }
    onShowItemDetails(eventArgs) {
        eventArgs.section.selectedItem = eventArgs.item;
        this.store$.dispatch(new SelectSectionAction({ mode: 'VIEW', section: eventArgs.section.eventArgs }));
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
            if ((layout.type === SECTIONTYPES.panel || layout.type === SECTIONTYPES.matrix) &&
                layout.code.toUpperCase() === sectionCode.toUpperCase()) {
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
