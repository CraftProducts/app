import { Action } from '@ngrx/store';
import { type } from 'src/app/lib/utils';

export const ActionTypes = {
    LoadAllTemplates: type('[LoadAllTemplates]'),
    LoadAllTemplatesFailed: type('[LoadAllTemplates] Failed'),
    LoadAllTemplatesSuccess: type('[LoadAllTemplates] Success'),

    LoadTemplate: type('[LoadTemplate]'),
    LoadTemplateFailed: type('[LoadTemplate] Failed'),
    LoadTemplateSuccess: type('[LoadTemplate] Success'),

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

export class SelectSectionAction implements Action {
    type = ActionTypes.SelectSection;
    constructor(public payload: any) { }
}

export type Actions =
    LoadTemplateAction
    | LoadAllTemplateAction

    | SelectSectionAction
    ;
