import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import * as _ from 'lodash-es';
import { Store } from '@ngrx/store';
import { TemplatesState } from '../+state/templates.state';
import { Subscription } from 'rxjs';
import { LoadTemplatesAction, LoadFileAction } from '../+state/templates.actions';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { load } from 'js-yaml';
import { IBACKEND_URLS, BackendUrl } from 'shared-lib';

@Component({
    selector: 'app-templates-list',
    templateUrl: './list.component.html'
})
export class TemplateListComponent implements OnInit, OnDestroy {
    isCollapsed = true;
    details$: Subscription;
    details: any;

    queryParams$: Subscription;
    selectedType: string;
    selectedCode: string;

    selectedGroup: any;
    filteredList: any;

    redirectTo$: Subscription;
    redirectTo = '/';

    templateFileLocation = "";
    documentationUrl = "";

    params$: Subscription;

    constructor(public store$: Store<TemplatesState>, public router: Router, public activatedRoute: ActivatedRoute,
        public messageService: MessageService, @Inject(IBACKEND_URLS) backendUrls: BackendUrl[]) {

        const templateUrlFound = _.find(backendUrls, { key: 'templates' })
        this.templateFileLocation = (templateUrlFound) ? `${templateUrlFound.value}` : "";
        const documentationUrlFound = _.find(backendUrls, { key: 'documentation' })
        this.documentationUrl = (documentationUrlFound) ? `${documentationUrlFound.value}` : "";
    }

    ngOnInit(): void {
        this.params$ = this.activatedRoute.params
            .pipe(filter(p => p.owner && p.repo))
            .subscribe(params => {
                this.templateFileLocation = `${this.templateFileLocation}/assets/${params.owner}/${params.repo}`;
                this.store$.dispatch(new LoadTemplatesAction(params));
            });

        this.queryParams$ = this.activatedRoute.queryParams
            .subscribe(qp => {
                this.selectedType = qp.group;
                this.selectedCode = qp.code;
                this.populateFilteredGroup()
            });

        this.redirectTo$ = this.activatedRoute.data
            .pipe(filter(data => data["redirectTo"] && data["redirectTo"].length > 0), map(data => data["redirectTo"]))
            .subscribe(redirectTo => this.redirectTo = `/${redirectTo}`);

        this.details$ = this.store$.select(p => p.templates.list)
            .pipe(filter(details => details))
            .subscribe(details => {
                this.details = details;
                this.populateFilteredGroup();
            });
    }

    ngOnDestroy(): void {
        this.params$ ? this.params$.unsubscribe() : null;
        this.queryParams$ ? this.queryParams$.unsubscribe() : null;
        this.redirectTo$ ? this.redirectTo$.unsubscribe() : null;
        this.details$ ? this.details$.unsubscribe() : null;
    }

    // onFileLoaded(fileContent) {
    //     if (fileContent && fileContent.content) {
    //         fileContent.type = 'data';
    //         fileContent.content = JSON.parse(fileContent.content);
    //     }
    //     this.store$.dispatch(new LoadFileAction(fileContent));
    // }

    onTemplateFileLoaded(fileContent) {
        if (fileContent && fileContent.content) {
            fileContent.type = 'template';
            fileContent.content = load(fileContent.content);
        }
        this.store$.dispatch(new LoadFileAction(fileContent));
    }

    onFileLoadingError = (err) => this.messageService.add({ severity: 'error', detail: 'Error:' + err, life: 5000, closable: true })

    populateFilteredGroup() {
        this.selectedGroup = null;

        if (this.details) {
            if (this.selectedCode && this.selectedType && this.details.groups) {
                const group = _.find(this.details.groups, { code: this.selectedType });
                if (group && group.list) {
                    this.selectedGroup = _.find(group.list, { code: this.selectedCode })
                    this.filteredList = _.filter(this.details.templates, (t) => _.includes(t[this.selectedType], this.selectedCode));
                }
            }
            else {
                this.filteredList = this.details.templates;
            }
        }
    }
}
