import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as templateActions from './templates.actions';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { TemplateService } from 'shared-lib';

@Injectable()
export class TemplatesEffects {
    constructor(private actions$: Actions, public templateService: TemplateService) { }

    @Effect() loadGroups = this.actions$.pipe(ofType(templateActions.ActionTypes.LoadGroups),
        switchMap(() =>
            this.templateService.loadGroups()
                .pipe(
                    map(payload => ({ type: templateActions.ActionTypes.LoadGroupsSuccess, payload })),
                    catchError(() => of({ type: templateActions.ActionTypes.LoadGroupsFailed }))
                )
        )
    );

    @Effect() loadAllTemplates = this.actions$.pipe(ofType(templateActions.ActionTypes.LoadGroupTemplates),
        switchMap((action: any) =>
            this.templateService.loadGroupTemplates(action.payload)
                .pipe(
                    map(payload => ({ type: templateActions.ActionTypes.LoadGroupTemplatesSuccess, payload })),
                    catchError(() => of({ type: templateActions.ActionTypes.LoadGroupTemplatesFailed }))
                )
        )
    );
}
