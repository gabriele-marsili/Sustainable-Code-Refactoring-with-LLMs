"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    constructor(...list) {
        this.list = list;
    }
    compare(otherList) {
        const len1 = this.list.length;
        const len2 = otherList.list.length;
        if (len1 === len2) {
            return this.areEqual(this.list, otherList.list) ? 'equal' : 'unequal';
        }
        if (len1 > len2) {
            return this.isSublist(this.list, otherList.list) ? 'superlist' : 'unequal';
        }
        return this.isSublist(otherList.list, this.list) ? 'sublist' : 'unequal';
    }
    isSublist(bigger, smaller) {
        const smallerLen = smaller.length;
        if (smallerLen === 0)
            return true;
        for (let i = 0; i <= bigger.length - smallerLen; i++) {
            if (this.areEqual(bigger.slice(i, i + smallerLen), smaller)) {
                return true;
            }
        }
        return false;
    }
    areEqual(arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }
}
exports.List = List;
