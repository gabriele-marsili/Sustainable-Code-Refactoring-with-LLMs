"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class ListNode {
    get value() {
        return this._value;
    }
    get next() {
        return this._next;
    }
    set next(n) {
        this._next = n;
    }
    constructor(v) {
        this._value = v;
        this._next = undefined;
    }
}
class List {
    get lastNode() {
        let current = this._first;
        while (current && current.next) {
            current = current.next;
        }
        return current;
    }
    static create(...values) {
        if (!values.length || !(values[0] instanceof List)) {
            return new List(values);
        }
        else {
            let list = values[0];
            for (let i = 1; i < values.length; i++) {
                list.concat(values[i]);
            }
            console.log(list);
            return list;
        }
    }
    constructor(values) {
        this._first = undefined;
        let previous;
        for (let v = 0; v < values.length; v++) {
            if (!this._first) {
                this._first = new ListNode(values[v]);
                previous = this._first;
            }
            else {
                let newValue = new ListNode(values[v]);
                previous.next = newValue;
                previous = newValue;
            }
        }
    }
    forEach(fn) {
        let current = this._first;
        while (current) {
            fn(current.value);
            current = current.next;
        }
    }
    append(list) {
        let lastNode = this.lastNode;
        let newListCurrent = list._first;
        while (newListCurrent) {
            if (!lastNode) {
                this._first = newListCurrent;
                lastNode = this._first;
            }
            else {
                lastNode.next = newListCurrent;
                lastNode = newListCurrent;
            }
            newListCurrent = newListCurrent.next;
        }
        return this;
    }
    length() {
        let current = this._first;
        let count = current ? 1 : 0;
        while (current && current.next) {
            count++;
            current = current.next;
        }
        return count;
    }
    filter(fn) {
        let current = this._first;
        let newList = List.create();
        while (current) {
            if (fn(current.value)) {
                newList.addValue(current.value);
            }
            current = current.next;
        }
        return newList;
    }
    addValue(value) {
        if (!this._first) {
            this._first = new ListNode(value);
        }
        else {
            this.lastNode.next = new ListNode(value);
        }
    }
    map(fn) {
        let current = this._first;
        let newList = List.create();
        while (current) {
            newList.addValue(fn(current.value));
            current = current.next;
        }
        return newList;
    }
    foldl(fn, initial) {
        let current = this._first;
        while (current) {
            initial = fn(initial, current.value);
            current = current.next;
        }
        return initial;
    }
    foldr(fn, initial) {
        let revList = this.reverse();
        let result = revList === null || revList === void 0 ? void 0 : revList.foldl(fn, initial);
        this.reverse();
        return result;
    }
    reverse() {
        if (!this._first)
            return this;
        let previous = undefined;
        let current = this._first;
        while (current) {
            let next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        this._first = previous;
        return this;
    }
    concat(anotherList) {
        if (!this._first || !anotherList._first)
            return anotherList;
        anotherList.forEach((i) => {
            let current = this._first;
            let hasValue = false;
            while (current) {
                if (current.value === i) {
                    hasValue = true;
                }
                current = current.next;
            }
            if (!hasValue) {
                this.addValue(i);
            }
        });
        return this;
    }
    log() {
        let current = this._first;
        let i = 0;
        while (current) {
            console.warn(`${i}: ${current.value}`);
            current = current.next;
            i++;
        }
    }
}
exports.List = List;
