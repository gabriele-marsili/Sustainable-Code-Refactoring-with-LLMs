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
            if (this.equals(otherList.list)) {
                return 'equal';
            }
        }
        else if (len1 > len2) {
            if (this.isSuperlist(otherList.list)) {
                return 'superlist';
            }
        }
        else {
            if (otherList.isSuperlist(this.list)) {
                return 'sublist';
            }
        }
        return 'unequal';
    }
    equals(other) {
        const len = this.list.length;
        if (len !== other.length) {
            return false;
        }
        for (let i = 0; i < len; i++) {
            if (this.list[i] !== other[i]) {
                return false;
            }
        }
        return true;
    }
    isSuperlist(smaller) {
        const len1 = this.list.length;
        const len2 = smaller.length;
        if (len2 === 0) {
            return true;
        }
        if (len1 < len2) {
            return false;
        }
        for (let i = 0; i <= len1 - len2; i++) {
            let match = true;
            for (let j = 0; j < len2; j++) {
                if (this.list[i + j] !== smaller[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return true;
            }
        }
        return false;
    }
}
exports.List = List;
