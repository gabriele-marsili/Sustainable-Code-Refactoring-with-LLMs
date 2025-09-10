export class List {
    list: number[];

    constructor(...list: number[]) {
        this.list = list;
    }

    compare(otherList: List): 'superlist' | 'sublist' | 'equal' | 'unequal' {
        const thisLength = this.list.length;
        const otherLength = otherList.list.length;

        if (thisLength === otherLength) {
            return this.isEqual(this.list, otherList.list) ? 'equal' : 'unequal';
        }

        if (thisLength > otherLength) {
            return this.isSublist(otherList.list, this.list) ? 'superlist' : 'unequal';
        }

        return this.isSublist(this.list, otherList.list) ? 'sublist' : 'unequal';
    }

    private isSublist(smaller: number[], bigger: number[]): boolean {
        const smallerLength = smaller.length;
        const biggerLength = bigger.length;

        if (smallerLength === 0) return true;

        for (let i = 0; i <= biggerLength - smallerLength; i++) {
            let match = true;
            for (let j = 0; j < smallerLength; j++) {
                if (bigger[i + j] !== smaller[j]) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }

        return false;
    }

    private isEqual(list1: number[], list2: number[]): boolean {
        if (list1.length !== list2.length) return false;

        for (let i = 0; i < list1.length; i++) {
            if (list1[i] !== list2[i]) return false;
        }

        return true;
    }
}