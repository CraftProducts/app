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
        sections.push(_.pick(data, fieldlist));
    }
    if (data.children && data.children.length > 0) {
        data.children.forEach(child => extractSections(child, fieldlist, sections));
    }
}
