export class List {
    list: number[];

    constructor(...list: number[]) {
        this.list = list;
    }

    compare(otherList: List): string {
        const len1 = this.list.length;
        const len2 = otherList.list.length;

        if (len1 === len2) {
            return this.isEqual(this.list, otherList.list) ? 'equal' : 'unequal';
        }

        if (len1 > len2) {
            return this.isSublist(otherList.list, this.list) ? 'superlist' : 'unequal';
        }

        return this.isSublist(this.list, otherList.list) ? 'sublist' : 'unequal';
    }

    private isSublist(smaller: number[], bigger: number[]): boolean {
        const smallerLen = smaller.length;
        const biggerLen = bigger.length;

        if (smallerLen === 0) return true;

        for (let i = 0; i <= biggerLen - smallerLen; i++) {
            if (this.isEqual(bigger.slice(i, i + smallerLen), smaller)) {
                return true;
            }
        }

        return false;
    }

    private isEqual(arr1: number[], arr2: number[]): boolean {
        if (arr1.length !== arr2.length) return false;

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }
}