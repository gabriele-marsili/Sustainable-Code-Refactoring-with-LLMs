type Predicate<T> = (el: T) => boolean

const negatePredicate = <T>(predicate: Predicate<T>) =>
    ((el: T) => !predicate(el))

export function keep<T>(array: T[], predicate: Predicate<T>) {
    const result = []
    for (const el of array) {
        if (predicate(el)) {
            result.push(el)
        }
    }
    return result
}

export const discard = <T>(array: T[], predicate: Predicate<T>) =>
    keep(array, negatePredicate(predicate))
