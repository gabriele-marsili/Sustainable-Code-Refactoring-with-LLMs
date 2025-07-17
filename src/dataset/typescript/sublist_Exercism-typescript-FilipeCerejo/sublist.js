"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    constructor(...list) {
        this.list = list;
    }
    compare(otherList) {
        if (this.list.length > otherList.list.length) {
            if (this.contains(this.list, otherList.list)) {
                return 'superlist';
            }
        }
        else if (otherList.list.length > this.list.length) {
            if (this.contains(otherList.list, this.list)) {
                return 'sublist';
            }
        }
        else {
            if (this.contains(this.list, otherList.list)) {
                return 'equal';
            }
        }
        return 'unequal';
    }
    contains(bigger, smaller) {
        let contain = false;
        let beginIdx = bigger.indexOf(smaller[0]);
        while (beginIdx <= bigger.length - smaller.length && beginIdx !== -1) {
            contain = true;
            for (let i = beginIdx, s = 0; i < beginIdx + smaller.length; i++, s++) {
                if (bigger[i] !== smaller[s]) {
                    contain = false;
                }
            }
            if (contain)
                break;
            beginIdx = bigger.indexOf(smaller[0], beginIdx + 1);
        }
        return contain || !smaller.length;
    }
}
exports.List = List;
