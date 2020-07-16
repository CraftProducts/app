import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    BootstrapApp: type("[BootstrapApp]"),
    BootstrapAppSuccess: type("[BootstrapApp] Success"),

    SetReturnUrl: type("[SetReturnUrl]"),

    LoadFile: type("[LoadFile]"),

    ResetTemplate: type("[ResetTemplate]"),
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

export class LoadFileAction implements Action {
    type = ActionTypes.LoadFile;
    constructor(public payload: any) { }
}

export class ResetTemplateAction implements Action {
    type = ActionTypes.ResetTemplate;
    constructor(public payload: any) { }
}

export class LoadTemplateAction implements Action {
    type = ActionTypes.LoadTemplate;
    constructor(public payload: any) { }
}

export type Actions =
    BootstrapAppAction
    | SetReturnUrlAction
    | ResetTemplateAction
    | LoadTemplateAction
    ;
