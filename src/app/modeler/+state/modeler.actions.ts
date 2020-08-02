import { Action } from '@ngrx/store';
import { type } from 'shared-lib';

export const ActionTypes = {
    CustomizeSection: type('[CustomizeSection]')
}

export class CustomizeSectionAction implements Action {
    type = ActionTypes.CustomizeSection;
    constructor(public payload: any) { }
}
