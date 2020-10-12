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

    getArtifactUrl(config, filename = '') {
        const path = filename && filename.length > 0 ? `${config.location}/${filename}` : config.location;
        return `${this.baseUrl}/api/artifacts/${config.installation_id}/${config.owner}/${config.repo}/${encodeURIComponent(path)}`;
    }

    public loadFiles(payload) {
        return this.httpClient.get(`${this.getArtifactUrl(payload)}?extension=json`);
    }

    public loadArtifact(config, filename) {
        return this.httpClient.get(this.getArtifactUrl(config, filename));
    }

    public saveArtifact = (config, filename, content, sha = null) => {
        return this.httpClient.post(this.getArtifactUrl(config, filename), { filename, content, sha });
    }


}