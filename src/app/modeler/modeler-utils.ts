import * as _ from 'lodash';

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

