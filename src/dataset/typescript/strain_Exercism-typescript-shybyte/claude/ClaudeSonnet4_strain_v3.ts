type Predicate<T> = (el: T) => boolean

const negatePredicate = <T>(predicate: Predicate<T>) =>
    ((el: T) => !predicate(el))

export function keep<T>(array: T[], predicate: Predicate<T>): T[] {
    const result: T[] = new Array()
    const length = array.length
    let resultIndex = 0
    
    for (let i = 0; i < length; i++) {
        const el = array[i]
        if (predicate(el)) {
            result[resultIndex++] = el
        }
    }
    
    result.length = resultIndex
    return result
}

export function discard<T>(array: T[], predicate: Predicate<T>): T[] {
    const result: T[] = new Array()
    const length = array.length
    let resultIndex = 0
    
    for (let i = 0; i < length; i++) {
        const el = array[i]
        if (!predicate(el)) {
            result[resultIndex++] = el
        }
    }
    
    result.length = resultIndex
    return result
}