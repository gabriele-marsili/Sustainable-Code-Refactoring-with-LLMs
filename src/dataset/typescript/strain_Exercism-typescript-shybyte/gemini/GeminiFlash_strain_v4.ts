type Predicate<T> = (el: T) => boolean

export function keep<T>(array: T[], predicate: Predicate<T>) {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (predicate(el)) {
            result.push(el);
        }
    }
    return result;
}

export const discard = <T>(array: T[], predicate: Predicate<T>) => {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        if (!predicate(el)) {
            result.push(el);
        }
    }
    return result;
};