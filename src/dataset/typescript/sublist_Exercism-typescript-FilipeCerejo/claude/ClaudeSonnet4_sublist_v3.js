"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    constructor(...list) {
        this.list = list;
    }
    compare(otherList) {
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
    contains(bigger, smaller) {
        if (smaller.length === 0)
            return true;
        if (bigger.length < smaller.length)
            return false;
        const maxStartIndex = bigger.length - smaller.length;
        for (let i = 0; i <= maxStartIndex; i++) {
            if (bigger[i] === smaller[0]) {
                let match = true;
                for (let j = 1; j < smaller.length; j++) {
                    if (bigger[i + j] !== smaller[j]) {
                        match = false;
                        break;
                    }
                }
                if (match)
                    return true;
            }
        }
        return false;
    }
    arraysEqual(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
}
exports.List = List;
