import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    SetGitspaceConfig: type('[SetGitspaceConfig]'),

    LoadGitspaceAllArtifacts: type('[LoadGitspaceAllArtifacts]'),
    LoadGitspaceAllArtifactsFailed: type('[LoadGitspaceAllArtifacts] Failed'),
    LoadGitspaceAllArtifactsSuccess: type('[LoadGitspaceAllArtifacts] Success'),

    LoadGitspaceArtifact: type('[LoadGitspaceArtifact]'),
    LoadGitspaceArtifactFailed: type('[LoadGitspaceArtifact] Failed'),
    LoadGitspaceArtifactSuccess: type('[LoadGitspaceArtifact] Success'),
    ResetGitspaceArtifact: type('[ResetGitspaceArtifact]'),

    // CreateNewArtifact: type('[CreateNewArtifact]')
}

export class SetGitspaceConfigAction implements Action {
    type = ActionTypes.SetGitspaceConfig;
    constructor(public payload: any) { }
}

export class LoadGitspaceAllArtifactsAction implements Action {
    type = ActionTypes.LoadGitspaceAllArtifacts;
    constructor(public payload: any) { }
}

export class LoadGitspaceArtifactAction implements Action {
    type = ActionTypes.LoadGitspaceArtifact;
    constructor(public payload: any) { }
}

export class ResetGitspaceArtifactAction implements Action {
    type = ActionTypes.ResetGitspaceArtifact;
    constructor(public payload: any) { }
}

// export class CreateNewArtifactAction implements Action {
//     type = ActionTypes.CreateNewArtifact;
//     constructor(public payload: any) { }
// }

export type Actions =
    ResetGitspaceArtifactAction
    | LoadGitspaceArtifactAction
    | LoadGitspaceAllArtifactsAction
    | SetGitspaceConfigAction
    // | CreateNewArtifactAction
    ;