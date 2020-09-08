import { Modeler } from './modeler.state';
import * as _ from 'lodash-es';
import { CommonActionTypes } from 'src/app/appcommon/lib/CommonActions';
import { resetModelChildren, makeBackwardCompatible, populateModelDataset, customizeSection, DEFAULT_THEME, applyThemeChildren } from '../modeler-utils';
import { ActionTypes } from './modeler.actions';

export function modelerReducer(state: Modeler, action: any): Modeler {
    console.log(action.type, action.payload);
    switch (action.type) {
        case CommonActionTypes.SetModel: {
            const modelInstance = action.payload;
            resetModelChildren(modelInstance.children, false);

            const dataset = state.dataset;
            if (dataset) {
                dataset.sections = makeBackwardCompatible(dataset.sections);
                populateModelDataset(modelInstance, dataset.sections);
            }
            return { ...state, selectedSection: null, modelInstance }
        }
        case CommonActionTypes.SetDataset: {
            const instance = _.cloneDeep(state.modelInstance);
            const dataset = action.payload;

            if (instance) {
                resetModelChildren(instance.children, false);

                if (dataset) {
                    dataset.sections = makeBackwardCompatible(dataset.sections);
                    populateModelDataset(instance, dataset.sections);
                }
            }
            return { ...state, dataset, modelInstance: { ...state.modelInstance, children: instance ? instance.children : null } }
        }

        case CommonActionTypes.SaveModel: {
            const children = state.modelInstance.children;
            resetModelChildren(children, false);
            return { ...state, selectedSection: null, modelInstance: { ...state.modelInstance, children } };
        }

        case CommonActionTypes.ResetModel: {
            const children = state.modelInstance.children;
            resetModelChildren(children, true);
            if (action.payload) {
                populateModelDataset(state.modelInstance, action.payload.sections);
            }
            return { ...state, selectedSection: null, modelInstance: { ...state.modelInstance, children } };
        }

        case ActionTypes.CustomizeSection: {
            const children = state.modelInstance.children;
            customizeSection(children, action.payload)
            return { ...state, modelInstance: { ...state.modelInstance, children } };
        }

        case CommonActionTypes.UpdateTheme: {
            const children = state.modelInstance.children;
            const theme = action.payload || DEFAULT_THEME;
            applyThemeChildren(children, theme);
            return { ...state, selectedSection: null, modelInstance: { ...state.modelInstance, children } };
        }

        case CommonActionTypes.CloseWorkspace: {
            return { ...state, modelInstance: null, selectedSection: null };
        }

        case CommonActionTypes.SelectSection: {
            return { ...state, selectedSection: action.payload };
        }

        default: return state;
    }

}
