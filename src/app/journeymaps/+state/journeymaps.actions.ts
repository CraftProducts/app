import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    SelectSection: type('[JM - SelectSection]')
}

export class SelectSectionAction implements Action {
    type = ActionTypes.SelectSection;
    constructor(public payload: any) { }
}
