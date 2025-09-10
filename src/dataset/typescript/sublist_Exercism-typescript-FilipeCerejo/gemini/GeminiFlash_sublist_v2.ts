export class List {
    list: number[];

    constructor(...list: number[]) {
        this.list = list;
    }

    compare(otherList: List): string {
        const len1 = this.list.length;
        const len2 = otherList.list.length;

        if (len1 === len2) {
            if (this.equals(otherList.list)) {
                return 'equal';
            }
        } else if (len1 > len2) {
            if (this.isSuperlist(otherList.list)) {
                return 'superlist';
            }
        } else {
            if (otherList.isSuperlist(this.list)) {
                return 'sublist';
            }
        }

        return 'unequal';
    }

    private equals(other: number[]): boolean {
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

    private isSuperlist(sublist: number[]): boolean {
        const len1 = this.list.length;
        const len2 = sublist.length;

        if (len2 === 0) return true;
        if (len1 < len2) return false;

        for (let i = 0; i <= len1 - len2; i++) {
            let match = true;
            for (let j = 0; j < len2; j++) {
                if (this.list[i + j] !== sublist[j]) {
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