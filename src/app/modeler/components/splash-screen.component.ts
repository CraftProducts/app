import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-splash-screen',
    templateUrl: './splash-screen.component.html'
})
export class SplashScreenComponent {
    @Input() isCustomTemplate = false;
}