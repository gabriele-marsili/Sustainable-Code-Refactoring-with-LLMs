function accumulate<T, U>(array: T[], accumulator: (el: T) => U): U[] {
    const result = []
    for (const el of array) {
        result.push(accumulator(el))
    }
    return result
}

export default accumulate