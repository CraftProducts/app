import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { ValuePropState } from '../+state/valueprop.state';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { extractSections } from '../valueprop-utils';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SetModelAction, CloseWorkspaceAction } from 'src/app/appcommon/lib/CommonActions';

@Component({
    selector: 'app-valueprop-home',
    templateUrl: './_home.component.html'
})
export class ValuePropHomeComponent implements OnInit, OnDestroy {
    landingUrl = 'valueprop';

    public version = environment.VERSION;

    isWorkspaceEmpty = true;
    instance: any;

    templateDetails: any;

    currentTemplate$: Subscription;
    currentTemplate: any;

    model$: Subscription;
    isModelDirty$: Subscription;
    isModelDirty: boolean;

    constructor(public store$: Store<ValuePropState>,
        public messageService: MessageService,
        public activatedRoute: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public router: Router) { }

    ngOnInit() {
        this.model$ = this.store$.select(p => p.valueProp.modelInstance)
            .pipe(filter(p => p))
            .subscribe(p => this.router.navigate([p.templateCode], { relativeTo: this.activatedRoute }));

        this.isModelDirty$ = this.store$.select(p => p.app.isModelDirty)
            .subscribe(p => this.isModelDirty = p);

        this.currentTemplate$ = this.store$.select(p => p.valueProp.templateModel)
            .subscribe(ct => this.currentTemplate = ct);
    }
    ngOnDestroy(): void {
        this.model$ ? this.model$.unsubscribe() : null;
        this.currentTemplate$ ? this.currentTemplate$.unsubscribe() : null;
    }

    onFileUpload(args, configUploader) {
        const file = args.files && args.files.length === 1 ? args.files[0] : null; // FileList object
        if (file) {
            this.getConfigurations(file)
                .then((data) => {
                    this.instance = data;
                    this.isWorkspaceEmpty = false;
                    if (this.instance) {
                        this.store$.dispatch(new SetModelAction(this.instance));
                    }
                }, (err) => {
                    this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true });
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
        this.instance = this.instance || {};
        this.instance.templateCode = this.currentTemplate.code;
        this.instance.sections = [];
        extractSections(this.currentTemplate, ['code', 'data'], this.instance.sections);

        this.downloadDataFile();
        this.store$.dispatch(new SetModelAction(this.instance));
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

    reset() {
        this.store$.dispatch(new SetModelAction(this.instance));
    }

    createNew() {
        this.isWorkspaceEmpty = false;
    }

    closeWorkspace() {
        this.isWorkspaceEmpty = true;
        this.store$.dispatch(new CloseWorkspaceAction(null))
        this.router.navigate(['/', this.landingUrl]);
    }
}
