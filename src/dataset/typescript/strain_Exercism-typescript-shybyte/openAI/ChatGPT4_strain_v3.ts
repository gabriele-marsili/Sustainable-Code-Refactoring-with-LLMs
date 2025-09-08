type Predicate<T> = (el: T) => boolean;

const negatePredicate = <T>(predicate: Predicate<T>): Predicate<T> =>
    (el: T) => !predicate(el);

export function keep<T>(array: T[], predicate: Predicate<T>): T[] {
    return array.filter(predicate);
}

export const discard = <T>(array: T[], predicate: Predicate<T>): T[] =>
    array.filter(negatePredicate(predicate));