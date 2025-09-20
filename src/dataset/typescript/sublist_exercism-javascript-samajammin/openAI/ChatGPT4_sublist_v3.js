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
        const [a, b] = [this._values, that._values];
        const [longList, shortList] = a.length >= b.length ? [a, b] : [b, a];
        const isShorter = a.length < b.length;
        if (shortList.length === 0) {
            return longList.length === 0
                ? ListComparisons.Equal
                : isShorter
                    ? ListComparisons.Sublist
                    : ListComparisons.Superlist;
        }
        const isSublist = (long, short) => long.some((_, i) => i + short.length <= long.length &&
            short.every((val, j) => val === long[i + j]));
        if (longList.length === shortList.length) {
            return a.every((val, i) => val === b[i])
                ? ListComparisons.Equal
                : ListComparisons.Unequal;
        }
        return isSublist(longList, shortList)
            ? isShorter
                ? ListComparisons.Sublist
                : ListComparisons.Superlist
            : ListComparisons.Unequal;
    }
}
exports.default = List;
