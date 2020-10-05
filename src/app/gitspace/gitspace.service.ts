import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash-es';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { load, safeLoad } from 'js-yaml';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GitspaceService {
    baseUrl = '';

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.githubApp.url;
    }

    public loadFiles(payload) {
        const extension = 'yaml';
        const path = 'templates';
        const url = `${this.baseUrl}/api/${payload.installation_id}/${payload.owner}/${payload.repo}/${path}/files?token=${payload.token}&extension=${extension}`;
        return this.httpClient.get(url);
    }

}