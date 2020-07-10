import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ValuePropEffects {
    templateFileLocation = `${environment.templateFileLocation}/valueprop`;
    
    constructor() { }
}
