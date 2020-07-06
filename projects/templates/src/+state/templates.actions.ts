import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    SetRedirectPath: type('[SetRedirectPath]'),

    LoadGroups: type('[LoadGroups]'),
    LoadGroupsFailed: type('[LoadGroups] Failed'),
    LoadGroupsSuccess: type('[LoadGroups] Success'),

    LoadGroupTemplates: type('[LoadGroupTemplates]'),
    LoadGroupTemplatesFailed: type('[LoadGroupTemplates] Failed'),
    LoadGroupTemplatesSuccess: type('[LoadGroupTemplates] Success')
}

export class SetRedirectPathAction implements Action {
    type = ActionTypes.SetRedirectPath;
    constructor(public payload: any) { }
}

export class LoadGroupsAction implements Action {
    type = ActionTypes.LoadGroups;
    constructor(public payload: any) { }
}

export class LoadGroupTemplatesAction implements Action {
    type = ActionTypes.LoadGroupTemplates;
    constructor(public payload: any) { }
}

export type Actions =
    SetRedirectPathAction
    | LoadGroupsAction
    | LoadGroupTemplatesAction
    ;
