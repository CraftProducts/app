import { Templates } from './templates.state';
import { ActionTypes } from './templates.actions';

export function templatesReducer(state: Templates, action: any): Templates {
    switch (action.type) {
        case ActionTypes.LoadTemplatesSuccess: {
            return { ...state, list: action.payload };
        }

        default: return state;
    }
}
