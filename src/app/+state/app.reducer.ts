import * as _ from 'lodash';
import { App } from './app.state';
import { ActionTypes } from './app.actions';

export function appReducer(state: App, action: any): App {
    switch (action.type) {
        case ActionTypes.BootstrapAppSuccess: {
            return { ...state, returnUrl: '' };
        }

        case ActionTypes.SetReturnUrl: {
            return { ...state, returnUrl: action.payload };
        }

        case ActionTypes.LoadTemplateSuccess: {
            return { ...state, currentTemplate: action.payload };
        }

        case ActionTypes.SaveModel:
        case ActionTypes.ResetModel: {
            return { ...state, isModelDirty: false };
        }

        case "[SetModelDirty]": {   //this comes from individual module actions . e.g. valueprop.actions, journeymaps.actions
            return { ...state, isModelDirty: true };
        }

        default: return state;
    }
}

