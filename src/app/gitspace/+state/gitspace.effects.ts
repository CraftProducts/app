import { Injectable } from '@angular/core';
import { TemplateService } from 'shared-lib';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from './gitspace.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GitspaceService } from '../gitspace.service';

@Injectable()
export class GitspaceEffects {
  constructor(private gitspaceService: GitspaceService, private actions$: Actions) { }

  @Effect() loadFiles = this.actions$.pipe(ofType(appActions.ActionTypes.LoadGitspaceFiles),
    switchMap((action: any) =>
      this.gitspaceService.loadFiles(action.payload)
        .pipe(
          map(payload => ({ type: appActions.ActionTypes.LoadGitspaceFilesSuccess, payload })),
          catchError(() => of({ type: appActions.ActionTypes.LoadGitspaceFilesFailed }))
        )
    )
  );

  @Effect() initializeGitspace = this.actions$.pipe(ofType(appActions.ActionTypes.InitializeGitspace),
  switchMap((action: any) =>
    this.gitspaceService.initialize(action.payload.config, action.payload.content)
      .pipe(
        map(payload => ({ type: appActions.ActionTypes.InitializeGitspaceSuccess, payload })),
        catchError(() => of({ type: appActions.ActionTypes.InitializeGitspaceFailed }))
      )
  )
);

}
