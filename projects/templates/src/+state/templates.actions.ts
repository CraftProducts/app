import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    LoadGroups: type('[LoadGroups]'),
    LoadGroupsFailed: type('[LoadGroups] Failed'),
    LoadGroupsSuccess: type('[LoadGroups] Success'),

    LoadGroupTemplates: type('[LoadGroupTemplates]'),
    LoadGroupTemplatesFailed: type('[LoadGroupTemplates] Failed'),
    LoadGroupTemplatesSuccess: type('[LoadGroupTemplates] Success')
}

export class LoadGroupsAction implements Action {
    type = ActionTypes.LoadGroups;
    constructor(public payload: any) { }
}

export class LoadGroupTemplatesAction implements Action {
    type = ActionTypes.LoadGroupTemplates;
    constructor(public payload: any) { console.log('LoadGroupTemplatesAction'); }
}

export type Actions =
    LoadGroupsAction
    | LoadGroupTemplatesAction
    ;
