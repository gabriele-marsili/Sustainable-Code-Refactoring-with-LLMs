// Really slow, but just wrapping around Set is boring.
export default class CustomSet<T> {
    private readonly data: T[] = []

    constructor(array: T[] = []) {
        for (const el of array) {
            if (!this.data.includes(el)) {
                this.data.push(el)
            }
        }
    }

    add(el: T) {
        return new CustomSet(this.data.concat(el))
    }

    difference(otherSet: CustomSet<T>) {
        return new CustomSet(this.data.filter((el) => !otherSet.contains(el)))
    }

    disjoint(otherSet: CustomSet<T>) {
        return this.data.every((el) => !otherSet.contains(el))
    }

    intersection(otherSet: CustomSet<T>) {
        return new CustomSet(this.data.filter((el) => otherSet.contains(el)))
    }

    subset(otherSet: CustomSet<T>) {
        return this.data.every((el) => otherSet.contains(el))
    }

    union(otherSet: CustomSet<T>) {
        return new CustomSet(this.data.concat(otherSet.data))
    }

    contains(needle: T) {
        return this.data.includes(needle)
    }

    empty() {
        return this.data.length === 0
    }

    eql(otherSet: CustomSet<T>) {
        const unionLength = this.union(otherSet).data.length
        return unionLength === this.data.length && unionLength === otherSet.data.length
    }
}