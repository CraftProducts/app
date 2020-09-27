import { Injectable } from '@angular/core';
import { TemplateService } from 'shared-lib';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from './app.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(private templateService: TemplateService, private actions$: Actions) { }

  @Effect() loadTemplate = this.actions$.pipe(ofType(appActions.ActionTypes.LoadTemplate),
    switchMap((action: any) =>
      this.templateService.loadTemplate(action.payload.owner, action.payload.repo, action.payload.templateCode)
        .pipe(
          map(payload => ({ type: appActions.ActionTypes.LoadTemplateSuccess, payload })),
          catchError(() => of({ type: appActions.ActionTypes.LoadTemplateFailed }))
        )
    )
  );
}
