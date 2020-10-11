import { Injectable } from '@angular/core';
import { TemplateService } from 'shared-lib';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from './gitspace.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GitspaceService } from '../gitspace.service';
import * as commonActions from '../../appcommon/lib/CommonActions'

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

  @Effect() saveArtifact = this.actions$.pipe(ofType(commonActions.CommonActionTypes.SaveModel),
    switchMap((action: any) => {
      const { instance, data } = action.payload;
      console.log(instance, data);
      if (data.saveLocation === commonActions.SaveLocationTypes.GitSpace) {
        return this.gitspaceService.saveArtifact(data.gitConfig, data.filename, JSON.stringify(instance))
          .pipe(
            map(payload => ({ type: commonActions.CommonActionTypes.SaveModelSuccess, payload })),
            catchError(() => of({ type: commonActions.CommonActionTypes.SaveModelFailed }))
          )
      } else {
        return of({ type: commonActions.CommonActionTypes.SaveModelSkipped });
      }
    })
  );

}
