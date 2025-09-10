export class List {
    private readonly list: number[];

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
            return 'unequal';
        }

        if (len1 > len2) {
            if (this.isSuperlist(otherList.list)) {
                return 'superlist';
            }
            return 'unequal';
        }

        if (this.isSublist(otherList.list)) {
            return 'sublist';
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

    private isSublist(otherList: number[]): boolean {
        return this.contains(otherList);
    }

    private isSuperlist(otherList: number[]): boolean {
        if (this.list.length === 0 && otherList.length > 0) {
            return false;
        }
        return otherList.length === 0 || this.contains(otherList);
    }

    private contains(otherList: number[]): boolean {
        if (otherList.length === 0) {
            return true;
        }

        if (this.list.length < otherList.length) {
            return false;
        }

        for (let i = 0; i <= this.list.length - otherList.length; i++) {
            let match = true;
            for (let j = 0; j < otherList.length; j++) {
                if (this.list[i + j] !== otherList[j]) {
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