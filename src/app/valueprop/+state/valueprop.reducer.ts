import { ValueProp } from './valueprop.state';
import { ActionTypes } from './valueprop.actions';
import * as _ from 'lodash';

export function valuePropReducer(state: ValueProp, action: any): ValueProp {
    switch (action.type) {
        case ActionTypes.LoadAllTemplatesSuccess: {
            return { ...state, templateDetails: action.payload };
        }

        case ActionTypes.LoadTemplateSuccess: {
            const currentTemplate = action.payload;
            const model = state.model;

            initializeData(model, currentTemplate);

            return { ...state, currentTemplate };
        }

        case ActionTypes.SetModel: {
            const model = action.payload;
            const currentTemplate = state.currentTemplate;

            initializeData(model, currentTemplate);

            return { ...state, model, currentTemplate, isModelDirty: false };
        }
        case ActionTypes.SetModelDirty: {
            return { ...state, isModelDirty: action.payload };
        }

        case ActionTypes.CloseWorkspace: {
            return { ...state, currentTemplate: null, model: null, isModelDirty: false, selectedSection: null };
        }

        case ActionTypes.SelectSection: {
            return { ...state, selectedSection: action.payload };
        }

        default: return state;
    }

    function initializeData(model: any, currentTemplate: any) {
        if (model && currentTemplate &&
            model.sections && model.sections.length > 0 &&
            model.templateCode.toLowerCase() === currentTemplate.code.toLowerCase()) {
            populateModelData(currentTemplate, model.sections);
        }
    }

    function populateModelData(section, lookupSections) {
        if (!section) return;

        if (section.type === 'panel') {
            const found = _.find(lookupSections, { code: section.code });
            section.data = found.data;
            section.isDirty = false;
        }
        if (section.children && section.children.length > 0) {
            section.children.forEach(s => populateModelData(s, lookupSections));
        }
    }
}
