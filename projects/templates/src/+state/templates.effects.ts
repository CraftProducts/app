import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as templateActions from './templates.actions';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { TemplateService } from 'shared-lib';

@Injectable()
export class TemplatesEffects {
    constructor(private actions$: Actions, public templateService: TemplateService) { }

    @Effect() loadTemplates = this.actions$.pipe(ofType(templateActions.ActionTypes.LoadTemplates),
        switchMap(() =>
            this.templateService.loadTemplates()
                .pipe(
                    map(payload => ({ type: templateActions.ActionTypes.LoadTemplatesSuccess, payload })),
                    catchError(() => of({ type: templateActions.ActionTypes.LoadTemplatesFailed }))
                )
        )
    );
}
