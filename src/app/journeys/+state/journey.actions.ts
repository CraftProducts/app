import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    LoadAllTemplates: type('[LoadAllTemplates]'),
    LoadAllTemplatesFailed: type('[LoadAllTemplates] Failed'),
    LoadAllTemplatesSuccess: type('[LoadAllTemplates] Success'),

    LoadTemplate: type('[LoadTemplate]'),
    LoadTemplateFailed: type('[LoadTemplate] Failed'),
    LoadTemplateSuccess: type('[LoadTemplate] Success'),

    SetModel: type("[SetModel]"),
    SetModelDirty: type("[SetModelDirty]"),

    CloseWorkspace: type("[CloseWorkspace]"),

    SelectSection: type('[SelectSection]')
}

export class LoadTemplateAction implements Action {
    type = ActionTypes.LoadTemplate;
    constructor(public payload: any) { }
}
export class LoadAllTemplateAction implements Action {
    type = ActionTypes.LoadAllTemplates;
    constructor(public payload: any) { }
}

export class SetModelAction implements Action {
    type = ActionTypes.SetModel;
    constructor(public payload: any) { }
}
export class SetModelDirtyAction implements Action {
    type = ActionTypes.SetModelDirty;
    constructor(public payload: any) { }
}
export class CloseWorkspaceAction implements Action {
    type = ActionTypes.CloseWorkspace;
    constructor(public payload: any) { }
}

export class SelectSectionAction implements Action {
    type = ActionTypes.SelectSection;
    constructor(public payload: any) { }
}

export type Actions =
    LoadTemplateAction
    | LoadAllTemplateAction

    | SetModelAction
    | SetModelDirtyAction
    | CloseWorkspaceAction

    | SelectSectionAction
    ;
