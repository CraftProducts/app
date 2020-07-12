import { Templates } from './templates.state';
import { ActionTypes } from './templates.actions';
import * as _ from 'lodash';

export function templatesReducer(state: Templates, action: any): Templates {
    switch (action.type) {
        case ActionTypes.SetRedirectPath: {
            return { ...state, redirectTo: action.payload };
        }

        // case ActionTypes.SetBreadcrumb: {
        //     return { ...state, breadcrumb: action.payload };
        // }

        case ActionTypes.LoadGroupsSuccess: {
            return { ...state, groups: action.payload };
        }

        case ActionTypes.LoadGroupTemplatesSuccess: {
            return { ...state, groupTemplates: action.payload };
        }

        default: return state;
    }
}
