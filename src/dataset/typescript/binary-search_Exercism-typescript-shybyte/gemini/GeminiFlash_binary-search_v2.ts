const isSorted = (array: number[]): boolean => {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
};

const binarySearch = (array: number[], value: number, begin: number, end: number): number => {
    while (begin < end) {
        const middleIndex = begin + Math.floor((end - begin) / 2);
        const middleValue = array[middleIndex];

        if (value === middleValue) {
            return middleIndex;
        } else if (value < middleValue) {
            end = middleIndex;
        } else {
            begin = middleIndex + 1;
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
        return binarySearch(this.sortedArray, value, 0, this.sortedArray.length);
    };
}