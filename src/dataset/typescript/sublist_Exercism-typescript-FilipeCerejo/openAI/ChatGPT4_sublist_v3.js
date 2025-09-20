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
            return this.equals(this.list, otherList.list) ? 'equal' : 'unequal';
        }
        if (thisLength > otherLength) {
            return this.isSubarray(this.list, otherList.list) ? 'superlist' : 'unequal';
        }
        return this.isSubarray(otherList.list, this.list) ? 'sublist' : 'unequal';
    }
    equals(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx]);
    }
    isSubarray(bigger, smaller) {
        const smallerLength = smaller.length;
        if (smallerLength === 0)
            return true;
        for (let i = 0; i <= bigger.length - smallerLength; i++) {
            if (bigger[i] === smaller[0] && this.equals(bigger.slice(i, i + smallerLength), smaller)) {
                return true;
            }
        }
        return false;
    }
}
exports.List = List;
