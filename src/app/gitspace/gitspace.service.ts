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
        const path = encodeURIComponent(payload.location);
        const url = `${this.baseUrl}/api/files/${payload.installation_id}/${payload.owner}/${payload.repo}/${path}?extension=${extension}`;
        return this.httpClient.get(url);
    }

    public loadArtifact(payload) {
        const { config, filename } = payload;
        const path = encodeURIComponent(`${config.location}/${filename}`);
        const url = `${this.baseUrl}/api/files/${config.installation_id}/${config.owner}/${config.repo}/${path}`;
        return this.httpClient.get(url);
    }

    public saveArtifact = (config, filename, content) => {
        console.log("saveArtifact", config, filename, content);
        const path = encodeURIComponent(`${config.location}/${filename}`);
        return this.httpClient.post(`${this.baseUrl}/api/files/${config.installation_id}/${config.owner}/${config.repo}/${path}`, { filename, content });
    }


}