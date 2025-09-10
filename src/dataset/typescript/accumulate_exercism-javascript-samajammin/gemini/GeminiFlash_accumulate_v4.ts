export default function accumulate<T, U>(
  collection: T[],
  accumulator: (i: T) => U
): U[] {
  const result: U[] = new Array(collection.length);
  for (let i = 0; i < collection.length; i++) {
    result[i] = accumulator(collection[i]);
  }
  return result;
}