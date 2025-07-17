"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class Item {
    constructor(value, next, prev) {
        this.value = value;
        this.prev = next || null;
        this.next = prev || null;
    }
}
class List {
    constructor() {
        this.first = null;
        this.last = null;
    }
    static create(...values) {
        // Do *not* construct any array literal ([]) in your solution.
        // Do *not* construct any arrays through new Array in your solution.
        // DO *not* use any of the Array.prototype methods in your solution.
        // You may use the destructuring and spreading (...) syntax from Iterable.
        const list = new List();
        values.forEach((value) => list.push(value));
        return list;
    }
    push(value) {
        const item = new Item(value);
        if (this.last) {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        else {
            this.last = this.first = item;
        }
    }
    unshift(value) {
        const item = new Item(value);
        if (this.first) {
            this.first.prev = item;
            item.next = this.first;
            this.first = item;
        }
        else {
            this.first = this.last = item;
        }
    }
    forEach(callbackFn) {
        let currItem = this.first;
        while (currItem) {
            callbackFn(currItem.value);
            currItem = currItem.next;
        }
    }
    append(list) {
        list.forEach((value) => {
            this.push(value);
        });
        return this;
    }
    concat(list) {
        list.forEach((value) => {
            if (typeof value === typeof list) {
                this.concat(value);
            }
            else {
                this.push(value);
            }
        });
        return this;
    }
    filter(filterFn) {
        const filteredList = new List();
        this.forEach((value) => {
            if (filterFn(value)) {
                filteredList.push(value);
            }
        });
        return filteredList;
    }
    length() {
        let count = 0;
        this.forEach(() => {
            count++;
        });
        return count;
    }
    map(mapFn) {
        const mappedList = new List();
        this.forEach((value) => {
            mappedList.push(mapFn(value));
        });
        return mappedList;
    }
    foldl(foldFn, initialValue) {
        let foldResult = initialValue;
        this.forEach((value) => {
            foldResult = foldFn(foldResult, value);
        });
        return foldResult;
    }
    foldr(foldFn, initialValue) {
        return this.reverse().foldl(foldFn, initialValue);
    }
    reverse() {
        const reversedList = new List();
        this.forEach((value) => {
            reversedList.unshift(value);
        });
        return reversedList;
    }
}
exports.List = List;
