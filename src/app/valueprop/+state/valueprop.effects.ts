import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as valuepropActions from './valueprop.actions';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { load } from 'js-yaml';

import { environment } from '../../../environments/environment';

@Injectable()
export class ValuePropEffects {
    templateFileLocation = environment.templateFileLocation;
    
    constructor(private httpClient: HttpClient, private actions$: Actions) { }

    @Effect() loadAllTemplates = this.actions$.pipe(ofType(valuepropActions.ActionTypes.LoadAllTemplates),
        switchMap((action: any) =>
            this.httpClient.get(`${this.templateFileLocation}/templates.yaml`, { responseType: "text" })
                .pipe(
                    map(yamlString => load(yamlString)),
                    map(payload => ({ type: valuepropActions.ActionTypes.LoadAllTemplatesSuccess, payload })),
                    catchError(() => of({ type: valuepropActions.ActionTypes.LoadAllTemplatesFailed }))
                )
        )
    );

    @Effect() loadTemplate = this.actions$.pipe(ofType(valuepropActions.ActionTypes.LoadTemplate),
        switchMap((action: any) =>
            this.httpClient.get(`${this.templateFileLocation}/${action.payload.toLowerCase()}.yaml`, { responseType: "text" })
                .pipe(
                    map(yamlString => load(yamlString)),
                    map(payload => ({ type: valuepropActions.ActionTypes.LoadTemplateSuccess, payload })),
                    catchError(() => of({ type: valuepropActions.ActionTypes.LoadTemplateFailed }))
                )
        )
    );

}
