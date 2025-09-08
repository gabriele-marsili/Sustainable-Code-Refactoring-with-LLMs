type Predicate<T> = (el: T) => boolean

const negatePredicate = <T>(predicate: Predicate<T>) =>
    ((el: T) => !predicate(el))

export function keep<T>(array: T[], predicate: Predicate<T>) {
    const result: T[] = []
    const length = array.length
    for (let i = 0; i < length; i++) {
        if (predicate(array[i])) {
            result.push(array[i])
        }
    }
    return result
}

export function discard<T>(array: T[], predicate: Predicate<T>) {
    const result: T[] = []
    const length = array.length
    for (let i = 0; i < length; i++) {
        if (!predicate(array[i])) {
            result.push(array[i])
        }
    }
    return result
}