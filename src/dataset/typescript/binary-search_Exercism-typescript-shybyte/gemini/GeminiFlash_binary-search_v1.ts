const isSorted = (array: number[]): boolean => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
};

const binarySearch = (array: number[], value: number): number => {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
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
    private readonly sortedArray: number[] | undefined;

    constructor(array: number[]) {
        this.sortedArray = isSorted(array) ? array : undefined;
    }

    indexOf = (value: number): number => {
        if (!this.sortedArray) {
            return -1;
        }
        return binarySearch(this.sortedArray, value);
    };
}