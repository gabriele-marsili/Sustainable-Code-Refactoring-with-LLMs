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
    }
    static create(...values) {
        const list = new List();
        let current = null;
        for (const value of values) {
            const item = new Item(value);
            if (!list.first) {
                list.first = list.last = item;
            }
            else {
                current.next = item;
                item.prev = current;
                list.last = item;
            }
            current = item;
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
        for (let currItem = this.first; currItem; currItem = currItem.next) {
            callbackFn(currItem.value);
        }
    }
    append(list) {
        if (!list.first)
            return this;
        if (this.last) {
            this.last.next = list.first;
            list.first.prev = this.last;
        }
        else {
            this.first = list.first;
        }
        this.last = list.last;
        return this;
    }
    concat(list) {
        return this.append(list);
    }
    filter(filterFn) {
        const filteredList = new List();
        for (let currItem = this.first; currItem; currItem = currItem.next) {
            if (filterFn(currItem.value)) {
                filteredList.push(currItem.value);
            }
        }
        return filteredList;
    }
    length() {
        let count = 0;
        for (let currItem = this.first; currItem; currItem = currItem.next) {
            count++;
        }
        return count;
    }
    map(mapFn) {
        const mappedList = new List();
        for (let currItem = this.first; currItem; currItem = currItem.next) {
            mappedList.push(mapFn(currItem.value));
        }
        return mappedList;
    }
    foldl(foldFn, initialValue) {
        let foldResult = initialValue;
        for (let currItem = this.first; currItem; currItem = currItem.next) {
            foldResult = foldFn(foldResult, currItem.value);
        }
        return foldResult;
    }
    foldr(foldFn, initialValue) {
        let foldResult = initialValue;
        for (let currItem = this.last; currItem; currItem = currItem.prev) {
            foldResult = foldFn(foldResult, currItem.value);
        }
        return foldResult;
    }
    reverse() {
        const reversedList = new List();
        for (let currItem = this.last; currItem; currItem = currItem.prev) {
            reversedList.push(currItem.value);
        }
        return reversedList;
    }
}
exports.List = List;
