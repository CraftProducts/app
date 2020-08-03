import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserModelCommandTypes, ResetModelAction, SaveModelAction, UpdateThemeAction, CloseWorkspaceAction } from 'src/app/appcommon/lib/CommonActions';
import { AppState } from 'src/app/+state/app.state';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';
import { LoadTemplateAction } from 'src/app/+state/app.actions';
import { extractSections, prepareTemplateForDownload } from '../modeler-utils';
import { dump } from "js-yaml";
import * as _ from "lodash";

export abstract class BaseTemplateViewer {
    instance: any;

    loadedTemplate: any;

    activatedRouteParams$: Subscription;
    activatedRouteQueryparams$: Subscription;
    combined$: Subscription;

    filename = '';
    userModelCommand$: Subscription;
    userModelCommand: any;

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    showExportSidebar = false;
    showThemeEditorSidebar = false;
    constructor(public store$: Store<AppState>, public router: Router, public activatedRoute: ActivatedRoute) { }

    abstract onTemplatesLoaded(template, dataset): void

    subscribeTemplates() {
        this.activatedRouteQueryparams$ = this.activatedRoute.queryParams
            .subscribe((qp) => {
                const primaryUrlSegmentGroup = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup && primaryUrlSegmentGroup.segments) {
                    switch (primaryUrlSegmentGroup.segments.length) {
                        case 2:
                            this.router.navigate(['toolbox', primaryUrlSegmentGroup.segments[1].path]);
                            break;
                        case 3:
                            if (primaryUrlSegmentGroup.segments[1].path.toLowerCase() !== "custom") {
                                this.store$.dispatch(
                                    new LoadTemplateAction({
                                        groupCode: primaryUrlSegmentGroup.segments[1].path,
                                        templateCode: primaryUrlSegmentGroup.segments[2].path,
                                        mode: qp.mode
                                    }))
                            }
                            break;
                        default: this.router.navigate(['toolbox']);
                    }
                } else {
                    this.router.navigate(['toolbox']);
                }
            })

        const loadedTemplateQ = this.store$.select(p => p.app.loadedTemplate).pipe(filter(p => p));
        const loadedFileQ = this.store$.select(p => p.app.loadedFile);

        this.combined$ = combineLatest(loadedTemplateQ, loadedFileQ)
            .subscribe(([template, file]) => {
                this.loadedTemplate = template;

                if (!file || !file.content || file.type === 'template') {
                    this.onTemplatesLoaded(template, null);
                }

                if (file && file.content && template &&
                    template.groupCode === file.content.groupCode &&
                    template.code === file.content.templateCode) {
                    this.onTemplatesLoaded(template, file.content);
                }
            });

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
        this.activatedRouteParams$ ? this.activatedRouteParams$.unsubscribe() : null;
        this.combined$ ? this.combined$.unsubscribe() : null;
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
        this.instance.groupCode = this.loadedTemplate.groupCode;
        this.instance.templateCode = this.loadedTemplate.code;
        this.instance.sections = [];
        console.log('this.loadedTemplate', this.loadedTemplate);
        extractSections(this.loadedTemplate, ['code', 'data', 'rows', 'columns'], this.instance.sections);

        console.log('this.instance.sections', this.instance.sections);

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
}
