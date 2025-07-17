"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor(list) {
        const newList = list || [];
        let length = 0;
        for (const _ of newList) {
            length++;
        }
        this.values = newList;
        this._length = length;
    }
    length() {
        return this._length;
    }
    push(value) {
        this._length++;
        this.values[this._length] = value;
        return this;
    }
    unshift(value) {
        this.values = [value, ...this.values];
        this._length++;
        return this;
    }
    append(list) {
        for (const value of list.values) {
            this.values.push(value);
        }
        return this;
    }
    concat(list) {
        const listCopy = this;
        for (const item of list.values) {
            if (item.values) {
                listCopy.values.push(...item.values);
            }
            else {
                listCopy.values.push(item);
            }
        }
        return listCopy;
    }
    filter(func) {
        const filteredList = new List();
        for (const value of this.values) {
            if (func(value) === true) {
                filteredList.values.push(value);
            }
        }
        return filteredList;
    }
    map(func) {
        const mappedList = new List();
        for (const value of this.values) {
            mappedList.values.push(func(value));
        }
        return mappedList;
    }
    reverse() {
        const reversed = new List();
        for (const value of this.values) {
            reversed.values.unshift(value);
        }
        return reversed;
    }
    foldl(func, initialVal) {
        let acc = initialVal;
        for (const value of this.values) {
            acc = func(acc, value);
        }
        return acc;
    }
    foldr(func, initialVal) {
        let acc = initialVal;
        for (let i = this.values.length - 1; i >= 0; i--) {
            acc = func(acc, this.values[i]);
        }
        return acc;
    }
}
exports.default = List;
