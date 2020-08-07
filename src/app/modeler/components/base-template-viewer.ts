import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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

    params$: Subscription;
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

        const paramsQ = this.activatedRoute.params.pipe(filter(p => p.templateCode), map(p => p.templateCode));
        const queryParamsQ = this.activatedRoute.queryParams.pipe(map(p => p.mode));

        this.params$ = combineLatest(paramsQ, queryParamsQ)
            .subscribe(([templateCode, mode]) => this.store$.dispatch(new LoadTemplateAction({ templateCode, mode })))

        const loadedTemplateQ = this.store$.select(p => p.app.loadedTemplate).pipe(filter(p => p));
        const loadedFileQ = this.store$.select(p => p.app.loadedFile);

        this.combined$ = combineLatest(loadedTemplateQ, loadedFileQ)
            .subscribe(([template, file]) => {
                this.loadedTemplate = template;

                if (!file || !file.content || file.type === 'template') {
                    this.onTemplatesLoaded(template, null);
                }

                if (file && file.content && template &&
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
        this.params$ ? this.params$.unsubscribe() : null;
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
        this.instance.templateCode = this.loadedTemplate.code;
        this.instance.sections = [];

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
}
