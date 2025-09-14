export default function accumulate<T, U>(
  collection: T[],
  accumulator: (i: T) => U
): U[] {
  const length = collection.length;
  const result = new Array<U>(length);
  
  for (let i = 0; i < length; i++) {
    result[i] = accumulator(collection[i]);
  }
  
  return result;
}