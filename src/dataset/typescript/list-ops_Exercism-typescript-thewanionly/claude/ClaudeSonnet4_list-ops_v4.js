"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class Item {
    constructor(value, next, prev) {
        this.value = value;
        this.prev = prev || null;
        this.next = next || null;
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
            this.last = this.first = item;
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
        let currItem = list.first;
        while (currItem) {
            this.push(currItem.value);
            currItem = currItem.next;
        }
        return this;
    }
    concat(list) {
        let currItem = list.first;
        while (currItem) {
            const value = currItem.value;
            if (value instanceof List) {
                this.concat(value);
            }
            else {
                this.push(value);
            }
            currItem = currItem.next;
        }
        return this;
    }
    filter(filterFn) {
        const filteredList = new List();
        let currItem = this.first;
        while (currItem) {
            const value = currItem.value;
            if (filterFn(value)) {
                filteredList.push(value);
            }
            currItem = currItem.next;
        }
        return filteredList;
    }
    length() {
        return this._length;
    }
    map(mapFn) {
        const mappedList = new List();
        let currItem = this.first;
        while (currItem) {
            mappedList.push(mapFn(currItem.value));
            currItem = currItem.next;
        }
        return mappedList;
    }
    foldl(foldFn, initialValue) {
        let foldResult = initialValue;
        let currItem = this.first;
        while (currItem) {
            foldResult = foldFn(foldResult, currItem.value);
            currItem = currItem.next;
        }
        return foldResult;
    }
    foldr(foldFn, initialValue) {
        let foldResult = initialValue;
        let currItem = this.last;
        while (currItem) {
            foldResult = foldFn(foldResult, currItem.value);
            currItem = currItem.prev;
        }
        return foldResult;
    }
    reverse() {
        const reversedList = new List();
        let currItem = this.last;
        while (currItem) {
            reversedList.push(currItem.value);
            currItem = currItem.prev;
        }
        return reversedList;
    }
}
exports.List = List;
