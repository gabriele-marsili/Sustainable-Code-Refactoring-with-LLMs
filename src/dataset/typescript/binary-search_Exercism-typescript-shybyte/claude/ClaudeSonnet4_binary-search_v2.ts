const isSorted = (array: number[]) => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) return false;
    }
    return true;
}

const indexOf = (array: number[], value: number, begin = 0, end = array.length): number => {
    while (begin < end) {
        if (begin === end - 1) {
            return array[begin] === value ? begin : -1;
        }
        
        const middleIndex = begin + ((end - begin) >>> 1);
        if (value < array[middleIndex]) {
            end = middleIndex;
        } else {
            begin = middleIndex;
        }
    }
    return -1;
}

export default class BinarySearch {
    readonly array: number[] | undefined

    constructor(array: number[]) {
        this.array = isSorted(array) ? array : undefined
    }

    indexOf = (value: number) => indexOf(this.array!, value)
}