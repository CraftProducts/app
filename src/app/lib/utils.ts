import * as _ from 'lodash';

const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Type "${label}" is not unique`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

export function groupChildren(children: any, groupByField: any) {
  const grouped = _.groupBy(children, groupByField);
  return Object.keys(grouped).map(key => {
    return { label: key, total: grouped[key].length, children: grouped[key] };
  });
}

export function generateCode(length: number): string {
  return random() // Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, length);
}

function random() {
  const seed = Math.random();
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
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
