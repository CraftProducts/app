import { Journeymaps } from './journeymaps.state';
import { ActionTypes } from './journeymaps.actions';
import * as _ from 'lodash';
import { CommonActionTypes } from 'src/app/appcommon/lib/CommonActions';
import { generateCode } from 'shared-lib';

export function journeymapsReducer(state: Journeymaps, action: any): Journeymaps {

    switch (action.type) {
        case CommonActionTypes.SetModel: {
            const modelInstance = action.payload.template;
            const dataset = action.payload.dataset;
            const children = modelInstance.children;
            resetModelChildren(children, false);
            if (dataset) {
                dataset.sections = makeBackwardCompatible(dataset.sections);
                populateModelDataset(modelInstance, dataset.sections);
            }
            return { ...state, selectedSection: null, modelInstance }
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
            if (action.payload) {
                populateModelDataset(state.modelInstance, action.payload.sections);
            }
            return { ...state, selectedSection: null, modelInstance: { ...state.modelInstance, children } };
        }
        case CommonActionTypes.CloseWorkspace: {
            return { ...state, modelInstance: null, selectedSection: null };
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
                child.isDirty = false;
                if (resetData) {
                    child.data = {};
                }
                resetModelChildren(child.children, resetData);
            });
        }
    }

    function populateModelDataset(node, lookupSections) {
        if (!node) return;

        if (node.type === 'panel') {
            const found = _.find(lookupSections, { code: node.code });
            node.data = found && found.data ? _.cloneDeep(found.data) : {};
            node.isDirty = false;
        }
        if (node.children && node.children.length > 0) {
            node.children.forEach(s => populateModelDataset(s, lookupSections));
        }
    }

    function makeBackwardCompatible(sections) {
        sections.map(section => {
            if (section.data && section.data.list) {
                section.data.list.forEach(element => element.code = element.code || generateCode(10));
            }
        });
        return sections;
    }
}
