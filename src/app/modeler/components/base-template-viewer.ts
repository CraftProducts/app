import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserModelCommandTypes, ResetModelAction, SaveModelAction } from 'src/app/appcommon/lib/CommonActions';
import { AppState } from 'src/app/+state/app.state';
import { ActivatedRoute, Router, PRIMARY_OUTLET } from '@angular/router';
import { LoadTemplateAction } from 'src/app/+state/app.actions';

export abstract class BaseTemplateViewer {
    instance: any;

    loadedTemplate: any;

    activatedRouteParams$: Subscription;
    activatedRouteQueryparams$: Subscription;
    combined$: Subscription;

    userModelCommand$: Subscription;
    userModelCommand: any;

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    constructor(public store$: Store<AppState>, public router: Router, public activatedRoute: ActivatedRoute) { }

    abstract onTemplatesLoaded(template, dataset): void

    subscribeTemplates() {
        this.activatedRouteQueryparams$ = this.activatedRoute.queryParams
            .subscribe((qp) => {
                const primaryUrlSegmentGroup = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup && primaryUrlSegmentGroup.segments) {
                    switch (primaryUrlSegmentGroup.segments.length) {
                        case 1:
                            this.router.navigate(['tools', primaryUrlSegmentGroup.segments[0].path]);
                            break;
                        case 2:
                            this.store$.dispatch(
                                new LoadTemplateAction({
                                    groupCode: primaryUrlSegmentGroup.segments[0].path,
                                    templateCode: primaryUrlSegmentGroup.segments[1].path,
                                    mode: qp.mode
                                }))
                            break;
                        default: this.router.navigate(['tools']);
                    }
                } else {
                    this.router.navigate(['tools']);
                }
            })

        const loadedTemplateQ = this.store$.select(p => p.app.loadedTemplate).pipe(filter(p => p));
        const loadedFileQ = this.store$.select(p => p.app.loadedFile);

        this.combined$ = combineLatest(loadedTemplateQ, loadedFileQ)
            .subscribe(([template, file]) => {
                this.loadedTemplate = template;

                if (!file || !file.content) {
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
                        this.onResetModel(this.userModelCommand.data);
                        break;
                    case UserModelCommandTypes.Close:
                        this.onCloseModel();
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
        this.instance = this.instance || {};
        this.instance.groupCode = this.loadedTemplate.groupCode;
        this.instance.templateCode = this.loadedTemplate.code;
        this.instance.sections = [];
        this.onExtractSections(this.loadedTemplate, ['code', 'data'], this.instance.sections);

        this.downloadDataFile(filename);
        this.store$.dispatch(new SaveModelAction(this.instance));
    }

    onResetModel(dataset): void {
        this.store$.dispatch(new ResetModelAction(dataset));
    }
    onCloseModel(): void {
        console.log('onCloseModel');
    }

    private downloadDataFile(filename) {
        var theJSON = JSON.stringify(this.instance);
        filename = filename || `${this.instance.templateCode}.json`;

        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}
