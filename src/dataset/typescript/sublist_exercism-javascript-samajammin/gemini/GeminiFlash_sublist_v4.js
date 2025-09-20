"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListComparisons;
(function (ListComparisons) {
    ListComparisons["Equal"] = "equal";
    ListComparisons["Sublist"] = "sublist";
    ListComparisons["Superlist"] = "superlist";
    ListComparisons["Unequal"] = "unequal";
})(ListComparisons || (ListComparisons = {}));
class List {
    constructor(...args) {
        this._values = args;
    }
    compare(that) {
        const list1 = this._values;
        const list2 = that._values;
        const len1 = list1.length;
        const len2 = list2.length;
        if (len1 === 0 && len2 === 0) {
            return ListComparisons.Equal;
        }
        if (len1 === len2) {
            if (list1.every((val, index) => val === list2[index])) {
                return ListComparisons.Equal;
            }
        }
        else if (len1 < len2) {
            if (this.isSublist(list1, list2)) {
                return ListComparisons.Sublist;
            }
        }
        else {
            if (this.isSublist(list2, list1)) {
                return ListComparisons.Superlist;
            }
        }
        return ListComparisons.Unequal;
    }
    isSublist(shortList, longList) {
        const shortLen = shortList.length;
        const longLen = longList.length;
        if (shortLen === 0) {
            return true;
        }
        if (shortLen > longLen) {
            return false;
        }
        for (let i = 0; i <= longLen - shortLen; i++) {
            let match = true;
            for (let j = 0; j < shortLen; j++) {
                if (longList[i + j] !== shortList[j]) {
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
exports.default = List;
