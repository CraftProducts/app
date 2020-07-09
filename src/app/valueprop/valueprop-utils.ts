import * as _ from 'lodash';

export function groupChildren(children: any, groupByField: any) {
    const grouped = _.groupBy(children, groupByField);
    return Object.keys(grouped).map(key => {
        return { label: key, total: grouped[key].length, children: grouped[key] };
    });
}

export function extractSections(data, fieldlist, sections) {
    if (!data) return;

    if (data.type === 'panel') {
        sections.push(_.pick(data, fieldlist));
    }
    if (data.children && data.children.length > 0) {
        data.children.forEach(child => extractSections(child, fieldlist, sections));
    }
}
