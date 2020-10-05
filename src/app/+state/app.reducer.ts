import { App } from './app.state';
import { ActionTypes, TemplateModuleActionTypes } from './app.actions';
import { CommonActionTypes } from '../appcommon/lib/CommonActions';

export function appReducer(state: App, action: any): App {

    switch (action.type) {

        case TemplateModuleActionTypes.LoadFile: {
            return { ...state, loadedFile: action.payload, isModelDirty: false };
        }

        case CommonActionTypes.UserModelCommand: {
            return { ...state, userModelCommand: action.payload, isModelDirty: false };
        }

        case CommonActionTypes.CloseWorkspace: {
            return {
                ...state,
                selectedTemplateGroup: null,
                loadedFile: null,
                loadedTemplate: null,
                templateToLoad: null,
                userModelCommand: null,
                isModelDirty: false
            };
        }

        case CommonActionTypes.SetModelDirty: {
            return { ...state, isModelDirty: true, userModelCommand: null };
        }

        case ActionTypes.BootstrapAppSuccess: {
            return { ...state, returnUrl: '' };
        }

        case ActionTypes.SetReturnUrl: {
            return { ...state, returnUrl: action.payload };
        }

        case ActionTypes.LoadTemplate: {
            return { ...state, templateToLoad: action.payload, userModelCommand: null };
        }
        case ActionTypes.LoadTemplateSuccess: {
            return { ...state, loadedTemplate: action.payload, isModelDirty: false };
        }
        case ActionTypes.LoadCustomTemplate: {
            action.payload.isCustom = true;
            return { ...state, loadedFile: null, loadedTemplate: action.payload, isModelDirty: false };
        }

        default: return state;
    }
}


