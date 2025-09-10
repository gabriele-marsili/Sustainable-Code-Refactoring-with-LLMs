class List {
    constructor(elements = []) {
        this.elements = elements;
    }

    compare(list) {
        const listA = this.elements;
        const listB = list.elements;

        if (listA.length === listB.length) {
            return listA.every((el, idx) => el === listB[idx]) ? "EQUAL" : "UNEQUAL";
        }

        const isSublist = (shorter, longer) => {
            for (let i = 0; i <= longer.length - shorter.length; i++) {
                if (shorter.every((el, idx) => el === longer[i + idx])) {
                    return true;
                }
            }
            return false;
        };

        if (listB.length === 0 || isSublist(listB, listA)) {
            return "SUPERLIST";
        }

        if (listA.length === 0 || isSublist(listA, listB)) {
            return "SUBLIST";
        }

        return "UNEQUAL";
    }
}

export default List;