import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserModelCommandTypes, ResetModelAction, SaveModelAction, OpenModelAction } from 'src/app/appcommon/lib/CommonActions';

export abstract class BaseTemplateViewer {
    instance: any;

    loadedTemplate$: Subscription;
    loadedTemplate: any;

    userModelCommand$: Subscription;
    userModelCommand: any;

    isModelDirty$: Subscription;
    isModelDirty: boolean;

    constructor(public store$: Store<ValuePropState>) {
    }

    abstract onTemplatesLoaded(loadedTemplate): void

    subscribeTemplates() {
        this.loadedTemplate$ = this.store$.select(p => p.app.loadedTemplate)
            .pipe(filter(template => template))
            .subscribe(template => {
                this.loadedTemplate = template;
                this.onTemplatesLoaded(template);
            });

        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);

        this.userModelCommand$ = this.store$.select(p => p.app.userModelCommand)
            .pipe(filter(p => p))
            .subscribe(userCommand => {
                this.userModelCommand = userCommand;
                switch (this.userModelCommand.command) {
                    case UserModelCommandTypes.Open:
                        this.onOpenModel(this.userModelCommand.data);
                        break;
                    case UserModelCommandTypes.Save:
                        this.onSaveModel();
                        break;
                    case UserModelCommandTypes.Reset:
                        this.onResetModel();
                        break;
                    case UserModelCommandTypes.Close:
                        this.onCloseModel();
                        break;
                }
            });
    }

    unsubscribeTemplates() {
        this.isModelDirty$ ? this.isModelDirty$.unsubscribe() : null;
        this.userModelCommand$ ? this.userModelCommand$.unsubscribe() : null;
        this.loadedTemplate$ ? this.loadedTemplate$.unsubscribe() : null;
    }

    onOpenModel(dataset) {
        this.store$.dispatch(new OpenModelAction(dataset));
    }
    abstract onExtractSections(modelInstance, fieldlist, sections): void
    onSaveModel(): void {
        this.instance = this.instance || {};
        this.instance.templateCode = this.loadedTemplate.code;
        this.instance.sections = [];
        this.onExtractSections(this.loadedTemplate, ['code', 'data'], this.instance.sections);

        this.downloadDataFile();
        this.store$.dispatch(new SaveModelAction(this.instance));
    }

    onResetModel(): void {
        this.store$.dispatch(new ResetModelAction(null));
    }
    onCloseModel(): void {
        console.log('onCloseModel');
    }

    private downloadDataFile() {
        var theJSON = JSON.stringify(this.instance);

        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        element.setAttribute('download', `${this.instance.templateCode}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}
