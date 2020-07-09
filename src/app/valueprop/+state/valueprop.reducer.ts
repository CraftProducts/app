import { ValueProp } from './valueprop.state';
import { ActionTypes } from './valueprop.actions';
import * as _ from 'lodash';
import { CommonActionTypes } from 'src/app/appcommon/lib/CommonActions';

export function valuePropReducer(state: ValueProp, action: any): ValueProp {
    switch (action.type) {
        case CommonActionTypes.SetModel: {
            return { ...state, modelInstance: action.payload, templateModel: action.payload }
        }
        case CommonActionTypes.OpenModel: {
            const data = action.payload;
            const children = state.modelInstance.children;
            resetModelChildren(children, false);
            populateModelDataset(state.modelInstance, data.sections);
            return {
                ...state,
                selectedSection: null,
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
            node.data = found.data;
            node.isDirty = false;
        }
        if (node.children && node.children.length > 0) {
            node.children.forEach(s => populateModelDataset(s, lookupSections));
        }
    }
}
