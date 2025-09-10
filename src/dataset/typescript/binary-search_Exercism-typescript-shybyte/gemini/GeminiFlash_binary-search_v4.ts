const isSorted = (array: number[]) => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
};

const indexOf = (array: number[], value: number, begin = 0, end = array.length): number => {
    let low = begin;
    let high = end - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        const midValue = array[mid];

        if (midValue === value) {
            return mid;
        } else if (midValue < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
};

export default class BinarySearch {
    readonly array: number[] | undefined;

    constructor(array: number[]) {
        this.array = isSorted(array) ? array : undefined;
    }

    indexOf = (value: number) => {
        if (!this.array) {
            return -1;
        }
        return indexOf(this.array, value);
    };
}