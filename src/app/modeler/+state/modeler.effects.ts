import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TemplateService } from 'shared-lib';
import * as commonActions from '../../appcommon/lib/CommonActions'

@Injectable()
export class ModelerEffects {
    constructor(private templateService: TemplateService, private actions$: Actions) { }

    @Effect() loadTemplate = this.actions$.pipe(ofType(commonActions.CommonActionTypes.SaveModel),
        switchMap((action: any) =>
            this.templateService.loadTemplate(action.payload.templateCode)
                .pipe(
                    map(payload => ({ type: commonActions.CommonActionTypes.SaveModelSuccess, payload })),
                    catchError(() => of({ type: commonActions.CommonActionTypes.SaveModelFailed }))
                )
        )
    );
}
