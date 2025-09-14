class List {
    constructor(elements) {
        this.elements = elements || [];
    }

    compare(list) {
        const listA = this.elements;
        const listB = list.elements;
        const lenA = listA.length;
        const lenB = listB.length;

        if (lenB === 0) {
            return lenA === 0 ? "EQUAL" : "SUPERLIST";
        }

        if (lenA === 0) {
            return "SUBLIST";
        }

        if (lenA === lenB) {
            for (let i = 0; i < lenA; i++) {
                if (listA[i] !== listB[i]) {
                    return "UNEQUAL";
                }
            }
            return "EQUAL";
        }

        if (lenA > lenB) {
            return this._isSubsequence(listA, listB, lenA, lenB) ? "SUPERLIST" : "UNEQUAL";
        } else {
            return this._isSubsequence(listB, listA, lenB, lenA) ? "SUBLIST" : "UNEQUAL";
        }
    }

    _isSubsequence(longer, shorter, longerLen, shorterLen) {
        const maxStart = longerLen - shorterLen;
        for (let i = 0; i <= maxStart; i++) {
            let match = true;
            for (let j = 0; j < shorterLen; j++) {
                if (longer[i + j] !== shorter[j]) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }
        return false;
    }
}

export default List;