const isSorted = (array: number[]): boolean => {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) return false;
    }
    return true;
};

const indexOf = (array: number[], value: number): number => {
    let begin = 0, end = array.length;
    while (begin < end) {
        const middleIndex = begin + Math.floor((end - begin) / 2);
        if (array[middleIndex] === value) return middleIndex;
        if (value < array[middleIndex]) {
            end = middleIndex;
        } else {
            begin = middleIndex + 1;
        }
    }
    return -1;
};

export default class BinarySearch {
    private readonly array?: number[];

    constructor(array: number[]) {
        this.array = isSorted(array) ? array : undefined;
    }

    indexOf(value: number): number {
        if (!this.array) return -1;
        return indexOf(this.array, value);
    }
}