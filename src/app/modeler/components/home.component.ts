import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ModelerState } from '../+state/modeler.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { ComponentCanDeactivate, UNLOAD_WARNING_MESSAGE } from 'shared-lib'
import { SetModelDirtyAction, SelectSectionAction, SetModelAction, SetDatasetAction, UserModelCommandTypes, ResetModelAction, CloseWorkspaceAction, SaveModelAction } from 'src/app/appcommon/lib/CommonActions';
import { SECTIONTYPES, extractSections, prepareTemplateForDownload } from '../modeler-utils';
import { filter, tap, map } from 'rxjs/operators';
import { LoadTemplateAction } from 'src/app/+state/app.actions';
import { dump } from 'js-yaml';

@Component({
    selector: 'app-modeler-home',
    templateUrl: './home.component.html'
})
export class ModelerHomeComponent implements ComponentCanDeactivate, OnInit, OnDestroy {
    instance: any;

    isCustomTemplate: boolean;
    loadedTemplate: any;

    qp$: Subscription;
    loadedTemplate$: Subscription;
    loadedFile$: Subscription;

    filename = '';
    userModelCommand$: Subscription;
    userModelCommand: any;

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    showExportSidebar = false;
    showThemeEditorSidebar = false;

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
                    this.onSectionSelected(qp.section);
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

    subscribeTemplates() {

        this.qp$ = this.activatedRoute.params
            .pipe(
                filter(p => p.templateCode),
                tap(p => this.isCustomTemplate = p.templateCode.toLowerCase() === 'custom'),
                filter(() => !this.isCustomTemplate),
                map(p => p.templateCode)
            )
            .subscribe((templateCode) => this.store$.dispatch(new LoadTemplateAction({ templateCode })));

        // const queryParamsQ = this.activatedRoute.queryParams.pipe(map(p => p.mode));

        this.loadedTemplate$ = this.store$.select(p => p.app.loadedTemplate)
            .pipe(filter(p => p), tap(p => this.loadedTemplate = p))
            .subscribe(loadedTemplate => this.store$.dispatch(new SetModelAction(loadedTemplate)));

        this.loadedFile$ = this.store$.select(p => p.app.loadedFile)
            .pipe(filter(loadedFile => loadedFile && loadedFile.content && loadedFile.type !== 'template'))
            .subscribe(loadedFile => this.store$.dispatch(new SetDatasetAction(loadedFile.content)));

        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);

        this.userModelCommand$ = this.store$.select(p => p.app.userModelCommand)
            .pipe(filter(p => p))
            .subscribe(userCommand => {
                this.userModelCommand = userCommand;
                switch (this.userModelCommand.command) {
                    case UserModelCommandTypes.Save:
                        this.onSaveModel(this.userModelCommand.data);
                        break;
                    case UserModelCommandTypes.Reset:
                        this.store$.dispatch(new ResetModelAction(this.userModelCommand.data));
                        break;
                    case UserModelCommandTypes.Close:
                        this.store$.dispatch(new CloseWorkspaceAction(null));
                        break;
                    case UserModelCommandTypes.Export:
                        this.showExportSidebar = true;
                        break;
                    case UserModelCommandTypes.CustomizeTheme:
                        this.showThemeEditorSidebar = true;
                        break;
                    case UserModelCommandTypes.SaveTemplate:
                        this.onSaveTemplate();
                        break;
                }
            });
    }

    unsubscribeTemplates() {
        this.qp$ ? this.qp$.unsubscribe() : null;
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
        this.loadedFile$ ? this.loadedFile$.unsubscribe() : null;
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
        this.userModelCommand$ ? this.userModelCommand$.unsubscribe() : null;
    }

    onSaveTemplate(): void {
        this.filename = `${this.loadedTemplate.code}.yaml`;
        const memento = _.cloneDeep(this.loadedTemplate);

        prepareTemplateForDownload(memento);

        const content = dump(memento);
        const mimetype = "text/x-yaml";
        this.downloadDataFile(this.filename, mimetype, content);
        this.store$.dispatch(new SaveModelAction(this.instance));
    }

    onSaveModel(filename): void {
        this.filename = filename;
        this.instance = this.instance || {};
        this.instance.templateCode = this.loadedTemplate.code;
        this.instance.sections = [];

        console.log('SaveModel extractSections');
        extractSections(this.loadedTemplate, ['code', 'data', 'rows', 'columns'], this.instance.sections);

        const content = JSON.stringify(this.instance);
        this.filename = this.filename || `${this.instance.templateCode}.json`;
        const mimetype = "text/json";
        this.downloadDataFile(this.filename, mimetype, content);
        this.store$.dispatch(new SaveModelAction(this.instance));
    }

    private downloadDataFile(filename, mimetype, content) {
        var element = document.createElement('a');
        element.setAttribute('href', `data:${mimetype};charset=UTF-8,${encodeURIComponent(content)}`);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    onManageSectionEditor(sectionCode = '') {
        const queryParams: any = { view: 'details' };
        if (sectionCode && sectionCode.length > 0) {
            queryParams.section = sectionCode;
        }
        this.router.navigate([], { queryParams })
    }

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
        const firstSectionCode = (this.sections && this.sections.length > 0) ? this.sections[0].code : '';
        this.onManageSectionEditor(firstSectionCode);
    }
}
