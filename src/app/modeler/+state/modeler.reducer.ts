import { Modeler } from './modeler.state';
import * as _ from 'lodash';
import { CommonActionTypes } from 'src/app/appcommon/lib/CommonActions';
import { generateCode } from 'shared-lib';
import { SECTIONTYPES, DATATYPES } from '../modeler-utils';

const DEFAULT_LIST_PROPERTIES = { view: 'list' };
const DEFAULT_IMAGE_PROPERTIES = { height: 100, width: 100 };

export function modelerReducer(state: Modeler, action: any): Modeler {
    // console.log(action.type, action.payload);
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

        case CommonActionTypes.SelectSection: {
            return { ...state, selectedSection: action.payload };
        }

        default: return state;
    }
    function resetModelChildren(children, resetData) {
        if (!children) return null;
        if (children.length > 0) {
            children.forEach(child => {
                child.isDirty = false;
                if (child.type === SECTIONTYPES.panel) {
                    initPanelProperties(child);
                } else if (child.type === SECTIONTYPES.matrix && child.rows && child.columns) {
                    child.rows.forEach(row => {
                        if (!row.columns || row.columns.length === 0 || resetData) {
                            initMatrixRowColumn(row, child);
                        } else if (resetData === false && row.columns) {
                            row.columns.forEach(column => column.isDirty = false);
                        }
                    })
                }

                if (!child.data || resetData) {
                    child.data = child.type === SECTIONTYPES.matrix ? [] : {};
                }
                resetModelChildren(child.children, resetData);
            });
        }
    }

    function populateModelDataset(node, lookupSections) {
        if (!node) return;

        if (node.type === SECTIONTYPES.panel) {
            const found = _.find(lookupSections, { code: node.code });
            node.data = found && found.data ? _.cloneDeep(found.data) : {};
            node.isDirty = false;
        } else if (node.type === SECTIONTYPES.matrix) {
            const found = _.find(lookupSections, { code: node.code });
            if (found && found.data && found.data.length > 0) {
                found.data.forEach(dt => {
                    const rowFound = _.find(node.rows, { code: dt.rowCode });
                    if (rowFound && rowFound.columns && rowFound.columns.length > 0) {
                        const colFound = _.find(rowFound.columns, { colCode: dt.colCode });
                        if (colFound) {
                            colFound.data = dt.data;
                        }
                    }
                });
            }
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

    function initPanelProperties(child: any) {
        if (child.datatype === DATATYPES.list) {
            child.properties = child.properties || DEFAULT_LIST_PROPERTIES;
            child.properties.view = child.properties.view || DEFAULT_LIST_PROPERTIES.view;
        }
        if (child.datatype === DATATYPES.image) {
            child.properties = child.properties || DEFAULT_IMAGE_PROPERTIES;
            child.properties.height = child.properties.height || DEFAULT_IMAGE_PROPERTIES.height;
            child.properties.width = child.properties.width || DEFAULT_IMAGE_PROPERTIES.width;
        }
    }

    function initMatrixRowColumn(row: any, child: any) {
        row.columns = [];
        child.columns.forEach(column => {
            const rowColumn: any = {
                rowCode: row.code,
                colCode: column.code,
                rowTitle: row.title,
                colTitle: column.title,
                datatype: row.datatype,
                properties: row.properties,
                data: { text: '', notes: [], tasks: [], links: [] }
            };
            if (row.datatype === DATATYPES.list) {
                rowColumn.options = row.options;
            }
            initPanelProperties(rowColumn);
            row.columns.push(rowColumn);
        });
    }
}
