import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserModelCommandTypes, ResetModelAction, SaveModelAction, UpdateThemeAction } from 'src/app/appcommon/lib/CommonActions';
import { AppState } from 'src/app/+state/app.state';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';
import { LoadTemplateAction } from 'src/app/+state/app.actions';

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
                        console.error('Not supported');
                        break;
                    case UserModelCommandTypes.Export:
                        this.showExportSidebar = true;
                        break;
                    case UserModelCommandTypes.CustomizeTheme:
                        this.showThemeEditorSidebar = true;
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

    abstract onExtractSections(modelInstance, fieldlist, sections): void

    onSaveModel(filename): void {
        this.filename = filename;
        this.instance = this.instance || {};
        this.instance.groupCode = this.loadedTemplate.groupCode;
        this.instance.templateCode = this.loadedTemplate.code;
        this.instance.sections = [];
        this.onExtractSections(this.loadedTemplate, ['code', 'data', 'rows', 'columns'], this.instance.sections);

        this.downloadDataFile();
        this.store$.dispatch(new SaveModelAction(this.instance));
    }

    private downloadDataFile() {
        var theJSON = JSON.stringify(this.instance);
        this.filename = this.filename || `${this.instance.templateCode}.json`;

        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        element.setAttribute('download', this.filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}
