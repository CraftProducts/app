import { Injectable } from '@angular/core';
import * as _ from 'lodash-es';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GitspaceService {
    baseUrl = '';

    constructor(private httpClient: HttpClient) {
        this.baseUrl = environment.githubApp.url;
    }

    public loadFiles(payload) {
        const extension = 'json';
        const path = encodeURIComponent('./.craftproducts');
        const url = `${this.baseUrl}/api/${payload.installation_id}/${payload.owner}/${payload.repo}/${path}/files?token=${payload.token}&extension=${extension}`;
        return this.httpClient.get(url);
    }

    public initialize = (config, content) =>
        this.httpClient.post(`${this.baseUrl}/api/${config.installation_id}/${config.owner}/${config.repo}/init`, { content });

}