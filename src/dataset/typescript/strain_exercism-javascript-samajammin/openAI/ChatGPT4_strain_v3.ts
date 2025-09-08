type Predicate<T> = (item: T) => boolean;

export function keep<T>(collection: T[], predicate: Predicate<T>): T[] {
  return collection.filter(item => predicate(item));
}

export function discard<T>(collection: T[], predicate: Predicate<T>): T[] {
  return collection.filter(item => !predicate(item));
}