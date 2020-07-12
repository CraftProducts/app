import * as _ from 'lodash';

export function extractSections(data, fieldlist, sections) {
    if (!data) return;

    if (data.type === 'panel') {
        sections.push(_.pick(data, fieldlist));
    }
    if (data.children && data.children.length > 0) {
        data.children.forEach(child => extractSections(child, fieldlist, sections));
    }
}
