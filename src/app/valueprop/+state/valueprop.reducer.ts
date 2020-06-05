import { ValueProp } from './valueprop.state';
import { ActionTypes } from './valueprop.actions';
export function valuePropReducer(state: ValueProp, action: any): ValueProp {
    switch (action.type) {
        case ActionTypes.LoadTemplateSuccess: {
            return { ...state, template: action.payload };
        }

        default: return state;
    }
}
