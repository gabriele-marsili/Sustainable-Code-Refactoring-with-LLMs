type Predicate<T> = (el: T) => boolean

export function keep<T>(array: T[], predicate: Predicate<T>): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (predicate(el)) {
            result.push(el);
        }
    }
    return result;
}

export function discard<T>(array: T[], predicate: Predicate<T>): T[] {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (!predicate(el)) {
            result.push(el);
        }
    }
    return result;
}