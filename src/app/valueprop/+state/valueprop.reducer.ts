import { ValueProp } from './valueprop.state';
import { ActionTypes } from './valueprop.actions';
export function valuePropReducer(state: ValueProp, action: any): ValueProp {
    switch (action.type) {
        case ActionTypes.LoadAllTemplatesSuccess: {
            return { ...state, templates: action.payload };
        }

        case ActionTypes.LoadTemplateSuccess: {
            return { ...state, currentTemplate: action.payload };
        }

        default: return state;
    }
}
