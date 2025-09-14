export class List {
    list: number[];

    constructor(...list: number[]) {
        this.list = list;
    }

    compare(otherList: List) {
        const thisLength = this.list.length;
        const otherLength = otherList.list.length;
        
        if (thisLength === otherLength) {
            return this.arraysEqual(this.list, otherList.list) ? 'equal' : 'unequal';
        }
        
        if (thisLength > otherLength) {
            return this.contains(this.list, otherList.list) ? 'superlist' : 'unequal';
        }
        
        return this.contains(otherList.list, this.list) ? 'sublist' : 'unequal';
    }

    private arraysEqual(arr1: number[], arr2: number[]): boolean {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    private contains(bigger: number[], smaller: number[]): boolean {
        if (smaller.length === 0) return true;
        if (bigger.length < smaller.length) return false;
        
        const maxStart = bigger.length - smaller.length;
        const firstElement = smaller[0];
        
        for (let i = 0; i <= maxStart; i++) {
            if (bigger[i] === firstElement) {
                let match = true;
                for (let j = 1; j < smaller.length; j++) {
                    if (bigger[i + j] !== smaller[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) return true;
            }
        }
        
        return false;
    }
}