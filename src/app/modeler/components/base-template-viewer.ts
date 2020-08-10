import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { UserModelCommandTypes, ResetModelAction, SaveModelAction, CloseWorkspaceAction, SetModelAction, SetDatasetAction } from 'src/app/appcommon/lib/CommonActions';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadTemplateAction } from 'src/app/+state/app.actions';
import { extractSections, prepareTemplateForDownload } from '../modeler-utils';
import { dump } from "js-yaml";
import * as _ from "lodash";
import { ModelerState } from '../+state/modeler.state';

export abstract class BaseTemplateViewer {
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
    constructor(public store$: Store<ModelerState>, public router: Router, public activatedRoute: ActivatedRoute) { }

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
}
