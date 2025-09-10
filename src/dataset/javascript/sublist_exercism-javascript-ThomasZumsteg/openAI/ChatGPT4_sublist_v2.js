class List {
    constructor(elements = []) {
        this.elements = elements;
    }

    compare(list) {
        const listA = this.elements;
        const listB = list.elements;

        if (listA.length === listB.length) {
            return this._isEqual(listA, listB) ? "EQUAL" : "UNEQUAL";
        }

        if (listA.length < listB.length) {
            return this._isSublist(listA, listB) ? "SUBLIST" : "UNEQUAL";
        }

        return this._isSublist(listB, listA) ? "SUPERLIST" : "UNEQUAL";
    }

    _isEqual(listA, listB) {
        return listA.length === listB.length && listA.every((val, idx) => val === listB[idx]);
    }

    _isSublist(shorter, longer) {
        if (shorter.length === 0) return true;
        for (let i = 0; i <= longer.length - shorter.length; i++) {
            if (longer.slice(i, i + shorter.length).every((val, idx) => val === shorter[idx])) {
                return true;
            }
        }
        return false;
    }
}

export default List;