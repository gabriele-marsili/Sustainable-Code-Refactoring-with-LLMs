"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(values = []) {
        this.values = values;
    }
    append(list2) {
        return new List([...this.values, ...list2.values]);
    }
    concat(list2) {
        return this.append(list2);
    }
    length() {
        return this.values.length;
    }
    filter(predicate) {
        return new List(this.foldl((acc, value) => {
            if (predicate(value)) {
                acc.push(value);
            }
            return acc;
        }, []));
    }
    map(f) {
        return new List(this.foldl((acc, value) => {
            acc.push(f(value));
            return acc;
        }, []));
    }
    foldl(f, initialAcc) {
        let acc = initialAcc;
        for (const value of this.values) {
            acc = f(acc, value);
        }
        return acc;
    }
    foldr(f, initialAcc) {
        let acc = initialAcc;
        for (let i = this.length() - 1; i >= 0; i--) {
            const value = this.values[i];
            acc = f(acc, value);
        }
        return acc;
    }
    reverse() {
        return new List(this.foldr((acc, value) => {
            acc.push(value);
            return acc;
        }, []));
    }
}
exports.default = List;
