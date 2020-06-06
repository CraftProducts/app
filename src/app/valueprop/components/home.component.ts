import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { filter } from 'rxjs/operators';
import { LoadAllTemplateAction, SetModelAction } from '../+state/valueprop.actions';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { extractSections } from 'src/app/lib/utils';

@Component({
    selector: 'app-valueprop-home',
    templateUrl: './home.component.html'
})
export class ValuePropHomeComponent implements OnInit, OnDestroy {
    fileLoaded = false;
    valueProModel: any;

    templates$: Subscription;
    templates: any;

    currentTemplate$: Subscription;
    currentTemplate: any;

    model$: Subscription;
    isModelDirty$: Subscription;
    isModelDirty: boolean;

    constructor(public store$: Store<ValuePropState>,
        public messageService: MessageService,
        public activatedRoute: ActivatedRoute,
        public router: Router) { }

    ngOnInit() {

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
            .pipe(filter(ct => ct))
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
                    if (this.valueProModel) {
                        this.store$.dispatch(new SetModelAction(this.valueProModel));
                    }
                    this.fileLoaded = true;
                }, (err) => {
                    this.messageService.add({
                        severity: 'error', detail: 'Error:' + err,
                        life: 5000, closable: true
                    });
                    configUploader.clear();
                }
                )
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
        extractSections(this.currentTemplate, ['data'], this.valueProModel.sections);
        this.store$.dispatch(new SetModelAction(this.valueProModel));
    }
    reset() {
        this.store$.dispatch(new SetModelAction(null));
        this.store$.dispatch(new SetModelAction(this.valueProModel));
    }
}
