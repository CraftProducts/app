import { ValueProp } from './valueprop.state';
import { ActionTypes } from './valueprop.actions';
import * as _ from 'lodash';
import { CommonActionTypes } from 'src/app/appcommon/lib/CommonActions';

export function valuePropReducer(state: ValueProp, action: any): ValueProp {
    console.log(action.type, action.payload);
    switch (action.type) {
        case CommonActionTypes.SetModel: {
            return { ...state, modelInstance: action.payload, templateModel: action.payload }
            // const model = action.payload;
            // const currentTemplate = state.currentTemplate;

            // initializeData(model, currentTemplate);

            // return { ...state, model, currentTemplate};
        }
        case CommonActionTypes.SaveModel: {
            const children = state.modelInstance.children;
            resetModelChildren(children, false);
            return {
                ...state,
                selectedSection: null,
                modelInstance: { ...state.modelInstance, children }
            };
        }
        case CommonActionTypes.ResetModel: {
            const children = state.modelInstance.children;
            resetModelChildren(children, true);
            return {
                ...state,
                selectedSection: null,
                modelInstance: { ...state.modelInstance, children }
            };
        }
        case CommonActionTypes.CloseWorkspace: {
            return { ...state, templateModel: null, modelInstance: null, selectedSection: null };
        }

        case ActionTypes.SelectSection: {
            return { ...state, selectedSection: action.payload };
        }

        default: return state;
    }
    function resetModelChildren(children, resetData) {
        if (!children) return null;
        if (children.length > 0) {
            children.forEach(child => {
                console.log('chld', child);
                child.isDirty = false;
                if (resetData) {
                    child.data = {};
                }
                resetModelChildren(child.children, resetData);
            });
        }
    }
    function initializeModelSections(modelDataset: any, currentTemplate: any) {
        console.log(modelDataset, currentTemplate);
        console.log(modelDataset.templateCode, modelDataset.sections);
        if (modelDataset && currentTemplate &&
            modelDataset.sections && modelDataset.sections.length > 0 &&
            modelDataset.templateCode.toLowerCase() === currentTemplate.code.toLowerCase()) {
            populateModelDataset(currentTemplate, modelDataset.sections);
        }
        return modelDataset.sections;
    }

    function populateModelDataset(section, lookupSections) {
        if (!section) return;

        if (section.type === 'panel') {
            const found = _.find(lookupSections, { code: section.code });
            section.data = found.data;
            section.isDirty = false;
        }
        if (section.children && section.children.length > 0) {
            section.children.forEach(s => populateModelDataset(s, lookupSections));
        }
    }
}
