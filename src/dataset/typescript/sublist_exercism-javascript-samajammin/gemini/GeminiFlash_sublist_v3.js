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
        if (list1.length === 0 && list2.length === 0) {
            return ListComparisons.Equal;
        }
        if (list1.length === 0) {
            return ListComparisons.Sublist;
        }
        if (list2.length === 0) {
            return ListComparisons.Superlist;
        }
        if (list1.length === list2.length) {
            if (list1.every((val, index) => val === list2[index])) {
                return ListComparisons.Equal;
            }
        }
        const isSublist = this.isSublist(list1, list2);
        if (isSublist) {
            return ListComparisons.Sublist;
        }
        const isSuperlist = this.isSublist(list2, list1);
        if (isSuperlist) {
            return ListComparisons.Superlist;
        }
        return ListComparisons.Unequal;
    }
    isSublist(longList, shortList) {
        if (shortList.length > longList.length) {
            return false;
        }
        for (let i = 0; i <= longList.length - shortList.length; i++) {
            let match = true;
            for (let j = 0; j < shortList.length; j++) {
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
