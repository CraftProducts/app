import * as _ from 'lodash';

const typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Type "${label}" is not unique`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

export function generateCode(length: number = 10): string {
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
