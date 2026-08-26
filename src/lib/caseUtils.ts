// Deep camelCase <-> snake_case conversion so our TS interfaces (camelCase)
// can talk directly to Postgres columns (snake_case) without hand-written
// per-table mapping.

const isPlainObject = (val: unknown): val is Record<string, unknown> =>
  typeof val === 'object' && val !== null && !Array.isArray(val) && !(val instanceof Date);

const camelToSnakeKey = (key: string) =>
  key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const snakeToCamelKey = (key: string) =>
  key.replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase());

export const toSnakeCase = (input: any): any => {
  if (Array.isArray(input)) return input.map(toSnakeCase);
  if (isPlainObject(input)) {
    return Object.entries(input).reduce((acc: Record<string, unknown>, [key, value]) => {
      acc[camelToSnakeKey(key)] = toSnakeCase(value);
      return acc;
    }, {});
  }
  return input;
};

export const toCamelCase = (input: unknown): unknown => {
  if (Array.isArray(input)) return input.map(toCamelCase);
  if (isPlainObject(input)) {
    return Object.entries(input).reduce((acc: Record<string, unknown>, [key, value]) => {
      acc[snakeToCamelKey(key)] = toCamelCase(value);
      return acc;
    }, {});
  }
  return input;
};