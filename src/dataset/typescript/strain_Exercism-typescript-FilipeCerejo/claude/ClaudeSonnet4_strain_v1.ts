export function keep<T>(arr: T[], predicate: (el: T) => boolean) {
    const result: T[] = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (predicate(element)) {
            result.push(element);
        }
    }
    return result;
}

export function discard<T>(arr: T[], predicate: (el: T) => boolean) {
    const result: T[] = [];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        if (!predicate(element)) {
            result.push(element);
        }
    }
    return result;
}