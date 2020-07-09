import { Injectable, Inject } from '@angular/core';
import { IBACKEND_URLS, BackendUrl } from '../lib/backend-urls';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { load } from 'js-yaml';

@Injectable({ providedIn: 'root' })
export class TemplateService {
    public templateFileLocation: string;
    constructor(@Inject(IBACKEND_URLS) backendUrls: BackendUrl[], private httpClient: HttpClient) {
        const found = _.find(backendUrls, { key: 'templates' })
        if (found) {
            this.templateFileLocation = `${found.value}`;
        }
    }

    public loadGroups() {
        return this.httpClient.get(`${this.templateFileLocation}/index.yaml`, { responseType: "text" })
            .pipe(map(yamlString => load(yamlString)));
    }

    public loadGroupTemplates(groupCode) {
        return this.httpClient.get(`${this.templateFileLocation}/${groupCode.toLowerCase()}/index.yaml`, { responseType: "text" })
            .pipe(map(yamlString => load(yamlString)))
    }

    public loadTemplate(groupCode, templateCode) {
        return this.httpClient.get(`${this.templateFileLocation}/${groupCode.toLowerCase()}/${templateCode.toLowerCase()}.yaml`, { responseType: "text" })
            .pipe(map(yamlString => load(yamlString)))
    }
}