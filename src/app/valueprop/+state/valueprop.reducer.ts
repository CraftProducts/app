import { ValueProp } from './valueprop.state';
import { ActionTypes } from './valueprop.actions';
import * as _ from 'lodash';
import { CommonActionTypes } from 'src/app/appcommon/lib/CommonActions';
import { generateCode } from 'shared-lib';

export function valuePropReducer(state: ValueProp, action: any): ValueProp {
    switch (action.type) {
        case CommonActionTypes.SetModel: {
            return { ...state, modelInstance: action.payload, templateModel: action.payload }
        }
        case CommonActionTypes.OpenModel: {
            const data = action.payload;
            const children = state.modelInstance.children;
            resetModelChildren(children, false);
            data.sections = makeBackwardCompatible(data.sections);
            populateModelDataset(state.modelInstance, data.sections);
            return {
                ...state,
                selectedSection: null,
                modelDataset: data,
                modelInstance: { ...state.modelInstance, children }
            };
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
            if (state.modelDataset) {
                populateModelDataset(state.modelInstance, state.modelDataset.sections);
            }
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
            node.data = _.cloneDeep(found.data);
            node.isDirty = false;
        }
        if (node.children && node.children.length > 0) {
            node.children.forEach(s => populateModelDataset(s, lookupSections));
        }
    }

    function makeBackwardCompatible(sections) {
        sections.map(section => {
            if (section.data && section.data.list) {
                section.data.list.forEach(element => element.code = element.code || generateCode());
            }
        });
        return sections;
    }
}
