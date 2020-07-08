import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    BootstrapApp: type("[BootstrapApp]"),
    BootstrapAppSuccess: type("[BootstrapApp] Success"),

    SetReturnUrl: type("[SetReturnUrl]"),

    LoadTemplate: type('[LoadTemplate]'),
    LoadTemplateFailed: type('[LoadTemplate] Failed'),
    LoadTemplateSuccess: type('[LoadTemplate] Success'),
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

export type Actions =
    BootstrapAppAction
    | SetReturnUrlAction
    | LoadTemplateAction
    ;
