const isSorted = (array: number[]) => array.every(
    (el, i) => (i + 1 === array.length) || (el <= array[i + 1]))

const indexOf = (array: number[], value: number, begin = 0, end = array.length): number => {
    switch (true) {
        case begin >= end:
            return -1
        case begin === end - 1:
            return array[begin] === value ? begin : -1
        default:
            const middleIndex = begin + Math.floor((end - begin) / 2)
            if (value < array[middleIndex]) {
                return indexOf(array, value, begin, middleIndex)
            } else {
                return indexOf(array, value, middleIndex, end)
            }
    }
}

export default class BinarySearch {
    readonly array: number[] | undefined

    constructor(array: number[]) {
        this.array = isSorted(array) ? array : undefined
    }

    indexOf = (value: number) => indexOf(this.array!, value)
}