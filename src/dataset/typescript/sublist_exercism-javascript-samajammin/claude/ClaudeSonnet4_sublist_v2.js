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
        const thisLen = this._values.length;
        const thatLen = that._values.length;
        // Handle equal length case first
        if (thisLen === thatLen) {
            if (thisLen === 0)
                return ListComparisons.Equal;
            for (let i = 0; i < thisLen; i++) {
                if (this._values[i] !== that._values[i]) {
                    return ListComparisons.Unequal;
                }
            }
            return ListComparisons.Equal;
        }
        // Determine which is longer/shorter
        const [longList, shortList, isThisShorter] = thisLen < thatLen
            ? [that._values, this._values, true]
            : [this._values, that._values, false];
        const shortLen = shortList.length;
        const longLen = longList.length;
        // Empty short list is always a sublist
        if (shortLen === 0) {
            return isThisShorter ? ListComparisons.Sublist : ListComparisons.Superlist;
        }
        // Check if shortList is contained in longList
        const maxStart = longLen - shortLen;
        for (let i = 0; i <= maxStart; i++) {
            let match = true;
            for (let j = 0; j < shortLen; j++) {
                if (longList[i + j] !== shortList[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return isThisShorter ? ListComparisons.Sublist : ListComparisons.Superlist;
            }
        }
        return ListComparisons.Unequal;
    }
}
exports.default = List;
