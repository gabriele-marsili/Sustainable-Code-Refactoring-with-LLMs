type Predicate<T> = (item: T) => boolean;

export function keep<T>(collection: T[], predicate: Predicate<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      result.push(collection[i]);
    }
  }
  return result;
}

export function discard<T>(collection: T[], predicate: Predicate<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < collection.length; i++) {
    if (!predicate(collection[i])) {
      result.push(collection[i]);
    }
  }
  return result;
}