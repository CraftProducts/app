import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { JourneyState } from '../+state/journey.state';
import { filter } from 'rxjs/operators';
import { LoadAllTemplateAction, SetModelAction, CloseWorkspaceAction } from '../+state/journey.actions';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { extractSections } from '../valueprop-utils';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-journey-home',
    templateUrl: './home.component.html'
})
export class JourneyHomeComponent implements OnInit, OnDestroy {
    landingUrl = 'journeymaps';

    public version = environment.VERSION;

    isWorkspaceEmpty = true;
    journeyModel: any;

    templateDetails$: Subscription;
    templateDetails: any;

    currentTemplate$: Subscription;
    currentTemplate: any;

    model$: Subscription;
    isModelDirty$: Subscription;
    isModelDirty: boolean;
    showBanner = false;
    eventNavigationEnd$: Subscription;

    constructor(public store$: Store<JourneyState>,
        public messageService: MessageService,
        public activatedRoute: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public router: Router) { }

    ngOnInit() {
        this.eventNavigationEnd$ = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.showBanner = this.activatedRoute.children.length === 0)
        this.showBanner = this.activatedRoute.children.length === 0;

        this.store$.dispatch(new LoadAllTemplateAction(null));

        this.model$ = this.store$.select(p => p.journey.model)
            .pipe(filter(p => p))
            .subscribe(p => this.router.navigate([p.templateCode], { relativeTo: this.activatedRoute }));

        this.isModelDirty$ = this.store$.select(p => p.journey.isModelDirty)
            .subscribe(p => this.isModelDirty = p);

        this.templateDetails$ = this.store$.select(p => p.journey.templates)
            .pipe(filter(templates => templates))
            .subscribe(templates => this.templateDetails = templates);

        this.currentTemplate$ = this.store$.select(p => p.journey.currentTemplate)
            .subscribe(ct => this.currentTemplate = ct);
    }
    ngOnDestroy(): void {
        this.eventNavigationEnd$ ? this.eventNavigationEnd$.unsubscribe() : null;
        this.model$ ? this.model$.unsubscribe() : null;
        this.templateDetails$ ? this.templateDetails$.unsubscribe() : null;
        this.currentTemplate$ ? this.currentTemplate$.unsubscribe() : null;
    }

    onFileUpload(args, configUploader) {
        const file = args.files && args.files.length === 1 ? args.files[0] : null; // FileList object
        if (file) {
            this.getConfigurations(file)
                .then((data) => {
                    this.journeyModel = data;
                    this.isWorkspaceEmpty = false;
                    if (this.journeyModel) {
                        this.store$.dispatch(new SetModelAction(this.journeyModel));
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
        this.journeyModel = this.journeyModel || {};
        this.journeyModel.templateCode = this.currentTemplate.code;
        this.journeyModel.sections = [];
        //extractSections(this.currentTemplate, ['code', 'data'], this.valueProModel.sections);

        this.downloadDataFile();
        this.store$.dispatch(new SetModelAction(this.journeyModel));
    }
    private downloadDataFile() {
        var theJSON = JSON.stringify(this.journeyModel);

        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
        element.setAttribute('download', `${this.journeyModel.templateCode}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    reset() {
        this.store$.dispatch(new SetModelAction(this.journeyModel));
    }

    createNew() {
        this.isWorkspaceEmpty = false;
    }

    closeWorkspace() {
        this.isWorkspaceEmpty = true;
        this.store$.dispatch(new CloseWorkspaceAction(null))
        this.router.navigate(['.']);
    }
}
