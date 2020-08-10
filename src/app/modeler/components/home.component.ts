import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ModelerState } from '../+state/modeler.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { ComponentCanDeactivate, UNLOAD_WARNING_MESSAGE } from 'shared-lib'
import { SetModelDirtyAction, SelectSectionAction } from 'src/app/appcommon/lib/CommonActions';
import { SECTIONTYPES, extractSections } from '../modeler-utils';
import { BaseTemplateViewer } from './base-template-viewer';

@Component({
    selector: 'app-modeler-home',
    templateUrl: './home.component.html'
})
export class ModelerHomeComponent extends BaseTemplateViewer implements ComponentCanDeactivate, OnInit, OnDestroy {

    public zoom = 100;
    editorVisible = false;
    editorMode = "VIEW";

    selectedSection$: Subscription;
    section: string;

    combined$: Subscription;
    model: any;
    sections = [];

    view = "";
    showIntro = false;

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

        this.qp$ = this.activatedRoute.queryParams
            .subscribe(qp => {
                this.view = qp.view ? qp.view.toLowerCase() : ""
                this.showIntro = this.view === "intro";
                this.sections = [];
            });

        const modelInstanceQ = this.store$.select(p => p.modeler.modelInstance);
        const queryparamsQ = this.activatedRoute.queryParams;

        this.combined$ = combineLatest(modelInstanceQ, queryparamsQ)
            .subscribe(([model, qp]) => {
                this.model = model;
                if (this.model) {
                    if (this.sections.length === 0) {
                        extractSections(this.model, ['code', 'title', 'summary', 'icon', 'type', 'datatype'], this.sections);
                    }
                    this.onSectionSelected(qp.sectionCode);
                }
            });

        this.selectedSection$ = this.store$.select(p => p.modeler.selectedSection)
            .subscribe(selectedSection => {
                if (selectedSection) {
                    this.editorMode = selectedSection.mode;
                    this.section = selectedSection.section;
                    this.editorVisible = true;
                } else {
                    this.editorVisible = false;
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribeTemplates();
        this.qp$ ? this.qp$.unsubscribe() : null;
        this.combined$ ? this.combined$.unsubscribe() : null;
        this.selectedSection$ ? this.selectedSection$.unsubscribe() : null;
    }

    onManageSectionEditor = (sectionCode = '') =>
        this.router.navigate([], { queryParams: { view: 'details', sectionCode }, queryParamsHandling: "merge" })

    onSectionSelected(sectionCode) {
        let payload = null;
        if (sectionCode && sectionCode.length > 0) {
            payload = {
                mode: this.editorMode,
                section: this.searchSectionInLayout(this.loadedTemplate, sectionCode)
            };
        }
        this.store$.dispatch(new SelectSectionAction(payload));
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
    onHideIntro() {
        this.router.navigate([], { queryParams: { view: 'details' }, queryParamsHandling: "merge" })
    }

    onProceed() {
        const sectionCode = (this.sections && this.sections.length > 0) ? this.sections[0].code : '';
        this.onManageSectionEditor(sectionCode);
    }
}
