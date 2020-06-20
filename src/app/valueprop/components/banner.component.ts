import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { GapiSession } from 'src/app/appcommon/googledrive/gapi.session';

@Component({
    selector: 'app-valueprop-banner',
    templateUrl: './banner.component.html'
})
export class ValuePropBannerComponent {
    @Input() templates: any;
    isCollapsed = true;
    constructor(public gapiSession: GapiSession) {

    }

    signIn() {
        this.gapiSession.signIn()
            .then((param) => {
                console.log(param, this.gapiSession);
                if (this.gapiSession.isSignedIn) {
                    //window.location.reload();
                }
            });
    }
}