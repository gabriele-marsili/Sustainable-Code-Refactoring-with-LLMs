"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    constructor(...list) {
        this.list = list;
    }
    compare(otherList) {
        const thisLen = this.list.length;
        const otherLen = otherList.list.length;
        if (thisLen === otherLen) {
            return this.arraysEqual(this.list, otherList.list) ? 'equal' : 'unequal';
        }
        if (thisLen > otherLen) {
            return this.contains(this.list, otherList.list) ? 'superlist' : 'unequal';
        }
        return this.contains(otherList.list, this.list) ? 'sublist' : 'unequal';
    }
    arraysEqual(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
    contains(bigger, smaller) {
        if (smaller.length === 0)
            return true;
        if (bigger.length < smaller.length)
            return false;
        const maxStart = bigger.length - smaller.length;
        outer: for (let i = 0; i <= maxStart; i++) {
            if (bigger[i] === smaller[0]) {
                for (let j = 1; j < smaller.length; j++) {
                    if (bigger[i + j] !== smaller[j]) {
                        continue outer;
                    }
                }
                return true;
            }
        }
        return false;
    }
}
exports.List = List;
