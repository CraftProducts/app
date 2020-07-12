import { Component } from '@angular/core';
import { environment } from '../../../environments/environment'
declare var google: any;

@Component({
    selector: 'app-gdrive',
    templateUrl: './gdrive.component.html'
})
export class GDriveSelectorComponent {

    developerKey = environment.google.API_KEY;
    clientId = environment.google.CLIENT_ID;
    scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file'
    ].join(' ');
    pickerApiLoaded = false;
    oauthToken?: any;

    loadGoogleDrive() {
        gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
        gapi.load('picker', { 'callback': this.onPickerApiLoad.bind(this) });
    }

    onAuthApiLoad() {
        gapi.auth.authorize(
            {
                'client_id': this.clientId,
                'scope': this.scope,
                'immediate': false
            },
            this.handleAuthResult);
    }

    onPickerApiLoad() {
        this.pickerApiLoaded = true;
    }

    handleAuthResult(authResult) {
        let src;
        if (authResult && !authResult.error) {
            if (authResult.access_token) {
                let view = new google.picker.View(google.picker.ViewId.DOCS);
                //view.setMimeTypes("image/png,image/jpeg,image/jpg,video/mp4");
                view.setMimeTypes("application/json");
                let pickerBuilder = new google.picker.PickerBuilder();
                let picker = pickerBuilder
                    //.enableFeature(google.picker.Feature.NAV_HIDDEN)
                    .setOAuthToken(authResult.access_token)
                    .addView(view)
                    .addView(new google.picker.DocsUploadView())
                    .setDeveloperKey('AIzaSyAkoFuREKxogSQ-uOuu0Oy07rRP7CcEj8Y')
                    .setCallback(function (e) {
                        if (e[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                            let doc = e[google.picker.Response.DOCUMENTS][0];
                            src = doc[google.picker.Document.URL];
                            console.log("Document selected is", doc, "and URL is ", src)
                        }
                    })
                    .build();
                picker.setVisible(true);
            }
        }
    }
}
