class List {
    constructor(elements = []) {
        this.elements = elements;
    }

    compare(list) {
        const listA = this.elements;
        const listB = list.elements;

        if (listA.length === listB.length) {
            return this.isEqual(listA, listB) ? "EQUAL" : "UNEQUAL";
        }

        if (listB.length === 0) return "SUPERLIST";
        if (listA.length === 0) return "SUBLIST";

        const isSublist = (shorter, longer) => {
            for (let i = 0; i <= longer.length - shorter.length; i++) {
                if (this.isEqual(shorter, longer.slice(i, i + shorter.length))) {
                    return true;
                }
            }
            return false;
        };

        if (listA.length > listB.length) {
            return isSublist(listB, listA) ? "SUPERLIST" : "UNEQUAL";
        } else {
            return isSublist(listA, listB) ? "SUBLIST" : "UNEQUAL";
        }
    }

    isEqual(listA, listB) {
        if (listA.length !== listB.length) return false;
        for (let i = 0; i < listA.length; i++) {
            if (listA[i] !== listB[i]) return false;
        }
        return true;
    }
}

export default List;