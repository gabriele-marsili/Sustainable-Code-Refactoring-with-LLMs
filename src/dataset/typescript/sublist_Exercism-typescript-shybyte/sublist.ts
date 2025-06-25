export default class List<T> {
    private readonly values: T[]

    constructor(...values: T[]) {
        this.values = values
    }

    contains(sublist: List<T>) {
        return sublist.values.length === 0 ||
            this.values.some((_v, startIndex) =>
                sublist.values.every((sublistElement, subListIndex) =>
                    sublistElement === this.values[startIndex + subListIndex]))
    }

    compare(other: List<T>) {
        if (this.values.length === other.values.length && this.contains(other)) {
            return 'equal'
        } else if (other.contains(this)) {
            return 'sublist'
        } else if (this.contains(other)) {
            return 'superlist'
        }
        return 'unequal'
    }
}
