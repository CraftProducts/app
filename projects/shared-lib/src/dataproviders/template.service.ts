import { Injectable, Inject } from '@angular/core';
import { IBACKEND_URLS, BackendUrl } from '../lib/backend-urls';
import * as _ from 'lodash-es';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { load, safeLoad } from 'js-yaml';

@Injectable({ providedIn: 'root' })
export class TemplateService {
    public templateFileLocation: string;
    constructor(@Inject(IBACKEND_URLS) backendUrls: BackendUrl[], private httpClient: HttpClient) {
        const found = _.find(backendUrls, { key: 'templates' })
        if (found) {
            this.templateFileLocation = `${found.value}`;
        }
    }

    public loadTemplates(owner, repo) {
        return this.httpClient.get(`${this.templateFileLocation}/${owner}/${repo}/index.yaml`, { responseType: "text" })
            .pipe(map(yamlString => {
                try { return safeLoad(yamlString); } catch (e) { return ''; }
            }))
    }

    public loadTemplate(owner, repo, templateCode) {
        return this.httpClient.get(`${this.templateFileLocation}/${owner}/${repo}/${templateCode.toLowerCase()}.yaml`, { responseType: "text" })
            .pipe(map(yamlString => {
                try { return safeLoad(yamlString); } catch (e) { return ''; }
            }))
    }
}
