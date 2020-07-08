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

        case ActionTypes.LoadTemplateSuccess: {
            return { ...state, currentTemplate: action.payload };
        }

        case CommonActionTypes.UserModelCommand: {
            return { ...state, userModelCommand: action.payload, isModelDirty: false };
        }

        case CommonActionTypes.SetModelDirty: {
            return { ...state, isModelDirty: true, userModelCommand: '' };
        }

        default: return state;
    }
}

