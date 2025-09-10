class List {
    constructor(elements) {
        this.elements = elements || [];
    }

    compare(list) {
        const listA = this.elements;
        const listB = list.elements;
        const lenA = listA.length;
        const lenB = listB.length;

        if (lenA === lenB) {
            if (lenA === 0) return "EQUAL";
            for (let i = 0; i < lenA; i++) {
                if (listA[i] !== listB[i]) return "UNEQUAL";
            }
            return "EQUAL";
        }

        if (lenB === 0) return "SUPERLIST";
        if (lenA === 0) return "SUBLIST";

        let isSublist = false;
        if (lenB < lenA) {
            for (let i = 0; i <= lenA - lenB; i++) {
                let match = true;
                for (let j = 0; j < lenB; j++) {
                    if (listA[i + j] !== listB[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    isSublist = true;
                    break;
                }
            }
            if (isSublist) return "SUPERLIST";
        } else {
            for (let i = 0; i <= lenB - lenA; i++) {
                let match = true;
                for (let j = 0; j < lenA; j++) {
                    if (listB[i + j] !== listA[j]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    return "SUBLIST";
                }
            }
        }

        return "UNEQUAL";
    }
}

export default List;