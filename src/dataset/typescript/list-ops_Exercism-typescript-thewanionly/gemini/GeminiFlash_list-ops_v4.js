"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class Item {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
class List {
    constructor() {
        this.first = null;
        this.last = null;
        this._length = 0;
    }
    static create(...values) {
        const list = new List();
        for (let i = 0; i < values.length; i++) {
            list.push(values[i]);
        }
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
            this.first = this.last = item;
        }
        this._length++;
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
        this._length++;
    }
    forEach(callbackFn) {
        let currItem = this.first;
        while (currItem) {
            callbackFn(currItem.value);
            currItem = currItem.next;
        }
    }
    append(list) {
        let current = list.first;
        while (current) {
            this.push(current.value);
            current = current.next;
        }
        return this;
    }
    concat(list) {
        let current = list.first;
        while (current) {
            this.push(current.value);
            current = current.next;
        }
        return this;
    }
    filter(filterFn) {
        const filteredList = new List();
        let current = this.first;
        while (current) {
            if (filterFn(current.value)) {
                filteredList.push(current.value);
            }
            current = current.next;
        }
        return filteredList;
    }
    length() {
        return this._length;
    }
    map(mapFn) {
        const mappedList = new List();
        let current = this.first;
        while (current) {
            mappedList.push(mapFn(current.value));
            current = current.next;
        }
        return mappedList;
    }
    foldl(foldFn, initialValue) {
        let foldResult = initialValue;
        let current = this.first;
        while (current) {
            foldResult = foldFn(foldResult, current.value);
            current = current.next;
        }
        return foldResult;
    }
    foldr(foldFn, initialValue) {
        let foldResult = initialValue;
        let current = this.last;
        while (current) {
            foldResult = foldFn(foldResult, current.value);
            current = current.prev;
        }
        return foldResult;
    }
    reverse() {
        const reversedList = new List();
        let current = this.first;
        while (current) {
            reversedList.unshift(current.value);
            current = current.next;
        }
        return reversedList;
    }
}
exports.List = List;
