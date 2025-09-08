export function keep<T>(arr: T[], predicate: (el: T) => boolean): T[] {
    return arr.filter(predicate);
}

export function discard<T>(arr: T[], predicate: (el: T) => boolean): T[] {
    return arr.filter(el => !predicate(el));
}