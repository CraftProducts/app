import { Injectable, EventEmitter } from "@angular/core";
import { AppRepository } from "./app.repository";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file';
import { environment } from '../../../environments/environment'
@Injectable({ providedIn: 'root' })
export class GapiSession {
    googleAuth: gapi.auth2.GoogleAuth;

    constructor(private appRepository: AppRepository) {
    }

    initClient() {
        return new Promise((resolve, reject) => {
            gapi.load('client:auth2', () => {
                return gapi.client.init({
                    apiKey: environment.google.API_KEY,
                    clientId: environment.google.CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                }).then(() => {
                    this.googleAuth = gapi.auth2.getAuthInstance();
                    resolve();
                });
            });
        });
    }
    get isSignedIn(): boolean {
        return this.googleAuth.isSignedIn.get();
    }

    signIn() {
        //c1onsole.log('signin', this.googleAuth);
        return this.googleAuth.signIn({ prompt: 'consent' })
            .then((googleUser: gapi.auth2.GoogleUser) => {
                this.appRepository.User.add(googleUser.getBasicProfile());
            })
            .catch(ex => {
                //c1onsole.log('ex', ex)
            });
    }

    signOut(): void {
        this.googleAuth.signOut();
    }
}