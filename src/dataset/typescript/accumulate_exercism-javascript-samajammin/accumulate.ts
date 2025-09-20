export default function accumulate<T, U>(
  collection: T[],
  accumulator: (i: T) => U
): U[] {
  return collection.map(accumulator);
}