import * as _ from 'lodash';
import { App } from './app.state';
import { ActionTypes, TemplateModuleActionTypes } from './app.actions';
import { CommonActionTypes } from '../appcommon/lib/CommonActions';

export function appReducer(state: App, action: any): App {

    switch (action.type) {

        // ----------------------- TEMPLATE MODULE ACTIONS ----------------------------

        // case TemplateModuleActionTypes.LoadGroupTemplatesSuccess: {
        //     return {
        //         ...state,
        //         selectedTemplateGroup: action.payload ? _.pick(action.payload, ['code', 'title', 'summary']) : null
        //     }
        // }
        case TemplateModuleActionTypes.LoadFile: {
            return { ...state, loadedFile: action.payload, isModelDirty: false };
        }
        // ----------------------- TEMPLATE MODULE ACTIONS ----------------------------

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
            let loadedFile = action.payload.mode && action.payload.mode.toLowerCase() === 'file'
                ? state.loadedFile
                : { ...state.loadedFile, filename: `${action.payload.templateCode}.json`, content: null }

            return { ...state, loadedFile, templateToLoad: action.payload, userModelCommand: null };
        }
        case ActionTypes.LoadTemplateSuccess: {
            const loadedTemplate = action.payload;
            return { ...state, loadedTemplate, isModelDirty: false };
        }
        case ActionTypes.LoadCustomTemplate: {
            return { ...state, loadedTemplate: action.payload, isModelDirty: false };
        }

        default: return state;
    }
}


