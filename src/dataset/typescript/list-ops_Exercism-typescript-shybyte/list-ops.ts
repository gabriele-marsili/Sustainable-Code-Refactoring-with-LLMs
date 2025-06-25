export default class List<T> {
    readonly values: T[]

    constructor(values: T[] = []) {
        this.values = values
    }

    append(list2: List<T>) {
        return new List([...this.values, ...list2.values])
    }

    concat(list2: List<T>) {
        return this.append(list2)
    }

    length() {
        return this.values.length
    }

    filter(predicate: (el: T) => boolean) {
        return new List(this.foldl((acc: T[], value) => {
            if (predicate(value)) {
                acc.push(value)
            }
            return acc
        }, []))
    }

    map<U>(f: (el: T) => U) {
        return new List(this.foldl((acc: U[], value) => {
            acc.push(f(value))
            return acc
        }, []))
    }

    foldl<A>(f: (acc: A, el: T) => A, initialAcc: A) {
        let acc = initialAcc
        for (const value of this.values) {
            acc = f(acc, value)
        }
        return acc
    }

    foldr<A>(f: (acc: A, el: T) => A, initialAcc: A) {
        let acc = initialAcc
        for (let i = this.length() - 1; i >= 0; i--) {
            const value = this.values[i]
            acc = f(acc, value)
        }
        return acc
    }

    reverse() {
        return new List(this.foldr((acc: T[], value) => {
            acc.push(value)
            return acc
        }, []))
    }
}
