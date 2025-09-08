type Predicate<T> = (item: T) => boolean;

export function keep<T>(collection: T[], predicate: Predicate<T>): T[] {
  const res: T[] = [];
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      res.push(collection[i]);
    }
  }
  return res;
}

export function discard<T>(collection: T[], predicate: Predicate<T>): T[] {
  const res: T[] = [];
  for (let i = 0; i < collection.length; i++) {
    if (!predicate(collection[i])) {
      res.push(collection[i]);
    }
  }
  return res;
}