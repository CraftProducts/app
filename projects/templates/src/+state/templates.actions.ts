import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    LoadTemplates: type('[LoadTemplates]'),
    LoadTemplatesFailed: type('[LoadTemplates] Failed'),
    LoadTemplatesSuccess: type('[LoadTemplates] Success'),

    LoadFile: type("[LoadFile]")
}

export class LoadTemplatesAction implements Action {
    type = ActionTypes.LoadTemplates;
    constructor(public payload: any) { }
}

export class LoadFileAction implements Action {
    type = ActionTypes.LoadFile;
    constructor(public payload: any) { }
}

export type Actions =
    LoadTemplatesAction
    | LoadFileAction
    ;
