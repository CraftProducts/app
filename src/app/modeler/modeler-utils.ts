import * as _ from 'lodash';
import { generateCode } from 'shared-lib';

export const SECTIONTYPES = {
    panel: 'panel',
    matrix: 'matrix',
    container: 'container'
}

export const DATATYPES = {
    text: 'text',
    list: 'list',
    select: 'select',
    image: 'image'
}
export const LISTVIEWTYPES = {
    list: 'list',
    tile: 'tile'
}

export const DEFAULT_LIST_PROPERTIES = { view: 'list' };
export const DEFAULT_IMAGE_PROPERTIES = { height: 100, width: 100 };
export const DEFAULT_THEME = { bgColor: '#ffffff', tile: { bgColor: '#fff9b8' } }

export function prepareTemplateForDownload(node) {
    if (!node) return;

    if (node.type === SECTIONTYPES.panel || node.type === SECTIONTYPES.matrix) {
        delete node.isDirty;
        delete node.data;
        if (node.rows && node.rows.length > 0) {
            node.rows.forEach(row => delete row.columns)
        }
    }
    if (node.children && node.children.length > 0) {
        node.children.forEach(child => prepareTemplateForDownload(child));
    }
}

export function extractSections(data, fieldlist, sections) {
    if (!data) return;

    if (data.type === SECTIONTYPES.panel || data.type === SECTIONTYPES.matrix) {

        const record = _.cloneDeep(_.pick(data, fieldlist));
        cleanupUnwantedProperties(record);
        sections.push(record);
    }
    if (data.children && data.children.length > 0) {
        data.children.forEach(child => extractSections(child, fieldlist, sections));
    }
}

function cleanupUnwantedProperties(record: any) {

    if (record.data && record.data.length > 0) {
        record.data.forEach(data => {
            delete data.rowTitle;
            delete data.colTitle
        })
    }
    if (record.rows) {
        record.rows.forEach(row => delete row.columns);
    }
}

export function resetModelChildren(children, resetData) {
    if (!children) return null;

    children.forEach((child) => {
        child.isDirty = false;
        if (child.type === SECTIONTYPES.panel) {
            initPanelProperties(child);
        } else if (child.type === SECTIONTYPES.matrix && child.rows && child.columns) {
            updateMatrixSection(child, child, resetData);
        }

        if (!child.data || resetData) {
            child.data = child.type === SECTIONTYPES.matrix ? [] : {};
        }
        resetModelChildren(child.children, resetData);
    });
}

export function customizeSection(children, record) {
    if (!children) return null;

    children.forEach((child) => {
        if (child.code === record.code && record.type === SECTIONTYPES.matrix) {
            updateMatrixSection(child, record, false);
        }
        customizeSection(child.children, record);
    });
}

export function updateMatrixSection(child: any, record: any, resetData: boolean) {
    record.rows = record.rows || child.rows || [];
    record.columns = record.columns || child.columns || [];

    child.rows = _.orderBy(record.rows, 'sequence');
    child.columns = _.orderBy(record.columns, 'sequence');

    child.rows.forEach(row => {
        if (!row.columns || row.columns.length === 0 || resetData) {
            initMatrixRowColumn(row, child);
        }
        if (resetData === false && row.columns) {
            if (child.columns.length !== row.columns.length) {
                child.columns.forEach(column => {
                    const found = _.find(row.columns, { colCode: column.code });
                    if (!found) {
                        row.columns.push(createRowColumn(row, column));
                    }
                });
            }
            row.columns.forEach(column => {
                if (resetData) {
                    column.isDirty = false;
                }
                column.properties = row.properties || column.properties;
                column.datatype = row.datatype || column.datatype;
                initPanelProperties(column);
                // column.theme = DEFAULT_THEME;
            });
        }
    });
}

export function applyThemeChildren(children, theme) {
    if (!children) return null;

    children.forEach((child, index) => {

        if (child.type === SECTIONTYPES.panel) {
            child.theme = getProcessedTheme(child, theme.panels[index % theme.panels.length]);
        }

        else if (child.type === SECTIONTYPES.matrix && child.rows) {
            child.rows.forEach((row, rowIndex) => {
                row.columns.forEach((column, columnIndex) => {
                    const localTheme = theme.matrix[(rowIndex + columnIndex) % theme.matrix.length];
                    column.cellTheme = localTheme;
                    column.theme = getProcessedTheme(column, localTheme);
                });
            })
        }

        applyThemeChildren(child.children, theme);
    });
}

export function getProcessedTheme(node: any, theme: any) {
    const localTheme = _.cloneDeep(theme);
    localTheme.tile = (node.datatype === DATATYPES.list && node.properties.view === LISTVIEWTYPES.tile)
        ? localTheme.tile
        : { bgColor: localTheme.bgColor, color: localTheme.color };
    return localTheme;
}

export function populateModelDataset(node, lookupSections) {
    if (!node) return;

    if (node.type === SECTIONTYPES.panel) {

        const found = _.find(lookupSections, { code: node.code });
        node.data = found && found.data ? _.cloneDeep(found.data) : {};
        node.isDirty = false;

    } else if (node.type === SECTIONTYPES.matrix) {

        const found = _.find(lookupSections, { code: node.code });
        if (found) {
            updateMatrixSection(node, found, false);
            if (found.data && found.data.length > 0) {
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
        }
        node.data = found && found.data ? _.cloneDeep(found.data) : {};
        node.isDirty = false;
    }
    if (node.children && node.children.length > 0) {
        node.children.forEach(s => populateModelDataset(s, lookupSections));
    }
}

export function makeBackwardCompatible(sections) {
    sections.map(section => {
        if (section.data && section.data.list) {
            section.data.list.forEach(element => element.code = element.code || generateCode(10));
        }
    });
    return sections;
}

function initPanelProperties(child: any) {
    const theme: any = _.cloneDeep(DEFAULT_THEME);
    if (child.datatype === DATATYPES.list) {
        child.properties = child.properties || DEFAULT_LIST_PROPERTIES;
        child.properties.view = child.properties.view || DEFAULT_LIST_PROPERTIES.view;

        theme.tile = (child.properties.view === LISTVIEWTYPES.tile) ? theme.tile : {};
    }
    if (child.datatype === DATATYPES.image) {
        child.properties = child.properties || DEFAULT_IMAGE_PROPERTIES;
        child.properties.height = child.properties.height || DEFAULT_IMAGE_PROPERTIES.height;
        child.properties.width = child.properties.width || DEFAULT_IMAGE_PROPERTIES.width;
    }
    child.theme = theme;
}

function initMatrixRowColumn(row: any, child: any) {
    row.columns = [];
    child.columns.forEach((column) => row.columns.push(createRowColumn(row, column)));
}

function createRowColumn(row: any, column: any) {
    const rowColumn: any = {
        rowCode: row.code,
        colCode: column.code,
        rowTitle: row.title,
        colTitle: column.title,
        datatype: row.datatype,
        properties: row.properties,
        data: { text: '', notes: [], tasks: [], links: [] },
        cellTheme: DEFAULT_THEME,
        theme: DEFAULT_THEME
    };

    if (row.datatype === DATATYPES.select) {
        rowColumn.options = row.options;
    }

    initPanelProperties(rowColumn);
    return rowColumn;
}

