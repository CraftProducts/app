import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    SetGitspaceConfig: type('[SetGitspaceConfig]'),

    LoadGitspaceFiles: type('[LoadGitspaceFiles]'),
    LoadGitspaceFilesFailed: type('[LoadGitspaceFiles] Failed'),
    LoadGitspaceFilesSuccess: type('[LoadGitspaceFiles] Success'),
}

export class SetGitspaceConfigAction implements Action {
    type = ActionTypes.SetGitspaceConfig;
    constructor(public payload: any) { }
}

export class LoadGitspaceFilesAction implements Action {
    type = ActionTypes.LoadGitspaceFiles;
    constructor(public payload: any) { }
}

export type Actions =
    LoadGitspaceFilesAction
    | SetGitspaceConfigAction
