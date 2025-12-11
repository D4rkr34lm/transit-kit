export type WithValue<K extends string, T> = { [P in K]: T };
export type WithoutValue = {};

export type MaybeValue<K extends string, T> = WithValue<K, T> | WithoutValue;

export function isWithValue<K extends string, T>(
  key: K,
  value: MaybeValue<K, T>,
): value is WithValue<K, T> {
  return key in value;
}
