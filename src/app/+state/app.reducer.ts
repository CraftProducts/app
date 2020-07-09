import * as _ from 'lodash';
import { App } from './app.state';
import { ActionTypes } from './app.actions';
import { CommonActionTypes } from '../appcommon/lib/CommonActions';

export function appReducer(state: App, action: any): App {
    switch (action.type) {
        case ActionTypes.BootstrapAppSuccess: {
            return { ...state, returnUrl: '' };
        }

        case ActionTypes.SetReturnUrl: {
            return { ...state, returnUrl: action.payload };
        }

        case ActionTypes.LoadTemplate: {
            return { ...state, templateToLoad: action.payload };
        }
        case ActionTypes.LoadTemplateSuccess: {
            const currentTemplate = action.payload;
            return { ...state, loadedTemplate: currentTemplate };
        }

        case CommonActionTypes.UserModelCommand: {
            return { ...state, userModelCommand: action.payload, isModelDirty: false };
        }

        case CommonActionTypes.SetModelDirty: {
            return { ...state, isModelDirty: true, userModelCommand: null };
        }

        default: return state;
    }
}

