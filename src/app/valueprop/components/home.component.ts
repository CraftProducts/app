import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { filter } from 'rxjs/operators';
import { LoadAllTemplateAction, SetModelAction, CloseWorkspaceAction } from '../+state/valueprop.actions';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { extractSections } from 'src/app/lib/utils';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-valueprop-home',
    templateUrl: './home.component.html'
})
export class ValuePropHomeComponent implements OnInit, OnDestroy {
    isCollapsed = true;
    public version = environment.VERSION;

    isWorkspaceEmpty = true;
    valueProModel: any;

    templates$: Subscription;
    templates: any;

    currentTemplate$: Subscription;
    currentTemplate: any;

    model$: Subscription;
    isModelDirty$: Subscription;
    isModelDirty: boolean;
    showBanner = false;

    constructor(public store$: Store<ValuePropState>,
        public messageService: MessageService,
        public activatedRoute: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public router: Router) { }

    ngOnInit() {
        this.showBanner = this.activatedRoute.children.length === 0;
        
        this.store$.dispatch(new LoadAllTemplateAction(null));

        this.model$ = this.store$.select(p => p.valueProp.model)
            .pipe(filter(p => p))
            .subscribe(p => this.router.navigate([p.templateCode], { relativeTo: this.activatedRoute }));

        this.isModelDirty$ = this.store$.select(p => p.valueProp.isModelDirty)
            .subscribe(p => this.isModelDirty = p);

        this.templates$ = this.store$.select(p => p.valueProp.templates)
            .pipe(filter(templates => templates))
            .subscribe(templates => this.templates = templates);

        this.currentTemplate$ = this.store$.select(p => p.valueProp.currentTemplate)
            .subscribe(ct => this.currentTemplate = ct);
    }
    ngOnDestroy(): void {
        this.model$ ? this.model$.unsubscribe() : null;
        this.templates$ ? this.templates$.unsubscribe() : null;
        this.currentTemplate$ ? this.currentTemplate$.unsubscribe() : null;
    }

    onFileUpload(args, configUploader) {
        const file = args.files && args.files.length === 1 ? args.files[0] : null; // FileList object
        if (file) {
            this.getConfigurations(file)
                .then((data) => {
                    this.valueProModel = data;
                    this.isWorkspaceEmpty = false;
                    if (this.valueProModel) {
                        this.store$.dispatch(new SetModelAction(this.valueProModel));
                    }
                }, (err) => {
                    this.messageService.add({
                        severity: 'error', detail: 'Error:' + err,
                        life: 5000, closable: true
                    });
                    configUploader.clear();
                })
        }
    }
    async getConfigurations(file: File) {
        return new Promise<any>((resolve, reject) => {
            var reader = new FileReader();

            reader.onload = (event: any) => {
                var data = event.target.result;
                try {
                    resolve(JSON.parse(data))
                } catch (ex) {
                    reject("Invalid file")
                }
            };
            reader.readAsText(file);
        });
    }

    save() {
        this.valueProModel = this.valueProModel || { templateCode: this.currentTemplate.code };
        this.valueProModel.sections = [];
        extractSections(this.currentTemplate, ['code', 'data'], this.valueProModel.sections);

        this.downloadDataFile();
        this.store$.dispatch(new SetModelAction(this.valueProModel));
    }
    private downloadDataFile() {
        var theJSON = JSON.stringify(this.valueProModel);

        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        element.setAttribute('download', `${this.valueProModel.templateCode}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    reset() {
        this.store$.dispatch(new SetModelAction(this.valueProModel));
    }

    createNew() {
        this.isWorkspaceEmpty = false;
    }

    closeWorspace() {
        this.isWorkspaceEmpty = true;
        this.store$.dispatch(new CloseWorkspaceAction(null))
        this.router.navigate(['.']);
    }
}
