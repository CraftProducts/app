import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    BootstrapApp: type("[BootstrapApp]"),
    BootstrapAppSuccess: type("[BootstrapApp] Success"),

    SetReturnUrl: type("[SetReturnUrl]"),

    LoadTemplate: type('[LoadTemplate]'),
    LoadTemplateFailed: type('[LoadTemplate] Failed'),
    LoadTemplateSuccess: type('[LoadTemplate] Success'),

    SaveModel: type("[SaveModel]"),
    ResetModel: type("[ResetModel]")
}

export const ModeTypes = {
    Offline: "offline",
    Online: "online"
}

export class BootstrapAppAction implements Action {
    type = ActionTypes.BootstrapApp;
    constructor(public payload: any) { }
}

export class SetReturnUrlAction implements Action {
    type = ActionTypes.SetReturnUrl;
    constructor(public payload: any) { }
}

export class LoadTemplateAction implements Action {
    type = ActionTypes.LoadTemplate;
    constructor(public payload: any) { }
}

export class SaveModelAction implements Action {
    type = ActionTypes.SaveModel;
    constructor(public payload: any) { }
}

export class ResetModelAction implements Action {
    type = ActionTypes.ResetModel;
    constructor(public payload: any) { }
}

export type Actions =
    BootstrapAppAction
    | SetReturnUrlAction
    | LoadTemplateAction

    | SaveModelAction
    | ResetModelAction
    ;
