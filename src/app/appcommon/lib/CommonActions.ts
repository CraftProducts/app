import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const CommonActionTypes = {
    SetModel: type("[SetModel]"),

    SaveModel: type("[SaveModel]"),
    ResetModel: type("[ResetModel]"),
    CloseWorkspace: type("[CloseWorkspace]"),
    UpdateTheme: type("[UpdateTheme]"),

    SetModelDirty: type("[SetModelDirty]"),
    UserModelCommand: type("[UserModelCommand]"),

    SelectSection: type('[SelectSection]')
}

export const UserModelCommandTypes = {
    Save: "Save",
    Reset: "Reset",
    Close: "Close",
    Export: "Export",
    CustomizeTheme: "CustomizeTheme"
}

export class UserModelCommandAction implements Action {
    type = CommonActionTypes.UserModelCommand;
    constructor(public payload: any) { }
}

export class SetModelDirtyAction implements Action {
    type = CommonActionTypes.SetModelDirty;
    constructor(public payload: any) { }
}

export class SetModelAction implements Action {
    type = CommonActionTypes.SetModel;
    constructor(public payload: any) { }
}

export class SaveModelAction implements Action {
    type = CommonActionTypes.SaveModel;
    constructor(public payload: any) { }
}
export class ResetModelAction implements Action {
    type = CommonActionTypes.ResetModel;
    constructor(public payload: any) { }
}
export class CloseWorkspaceAction implements Action {
    type = CommonActionTypes.CloseWorkspace;
    constructor(public payload: any) { }
}
export class UpdateThemeAction implements Action {
    type = CommonActionTypes.UpdateTheme;
    constructor(public payload: any) { }
}

export class SelectSectionAction implements Action {
    type = CommonActionTypes.SelectSection;
    constructor(public payload: any) { }
}
