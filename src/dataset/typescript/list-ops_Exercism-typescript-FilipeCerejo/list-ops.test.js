"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_ops_1 = require("./list-ops");
expect.extend({
    toHaveValues(received, ...expected) {
        if (!('forEach' in received)) {
            return {
                pass: false,
                message: () => `Implement .forEach(callback) on your list`,
            };
        }
        const values = [];
        received.forEach((item) => {
            values.push(item);
        });
        const pass = JSON.stringify(values) === JSON.stringify(expected);
        return {
            pass,
            message: () => pass
                ? ''
                : `Expected to see the following values: ${JSON.stringify(expected)}, actual: ${JSON.stringify(values)}`,
        };
    },
});
describe('append entries to a list and return the new list', () => {
    it('empty lists', () => {
        const list1 = list_ops_1.List.create();
        const list2 = list_ops_1.List.create();
        expect(list1.append(list2)).toEqual(list_ops_1.List.create());
    });
    xit('empty list to list', () => {
        const list1 = list_ops_1.List.create(1, 2, 3, 4);
        const list2 = list_ops_1.List.create();
        expect(list1.append(list2)).toEqual(list1);
    });
    xit('non-empty lists', () => {
        const list1 = list_ops_1.List.create(1, 2);
        const list2 = list_ops_1.List.create(2, 3, 4, 5);
        expect(list1.append(list2)).toHaveValues(1, 2, 2, 3, 4, 5);
    });
});
describe('concat lists and lists of lists into new list', () => {
    xit('empty list', () => {
        const list1 = list_ops_1.List.create();
        const list2 = list_ops_1.List.create();
        expect(list1.concat(list2)).toHaveValues();
    });
    xit('list of lists', () => {
        const list1 = list_ops_1.List.create(1, 2);
        const list2 = list_ops_1.List.create(3);
        const list3 = list_ops_1.List.create();
        const list4 = list_ops_1.List.create(4, 5, 6);
        const listOfLists = list_ops_1.List.create(list2, list3, list4);
        expect(list1.concat(listOfLists)).toHaveValues(1, 2, 3, 4, 5, 6);
    });
});
describe('filter list returning only values that satisfy the filter function', () => {
    xit('empty list', () => {
        const list1 = list_ops_1.List.create();
        expect(list1.filter((el) => el % 2 === 1)).toHaveValues();
    });
    xit('non empty list', () => {
        const list1 = list_ops_1.List.create(1, 2, 3, 5);
        expect(list1.filter((el) => el % 2 === 1)).toHaveValues(1, 3, 5);
    });
});
describe('returns the length of a list', () => {
    xit('empty list', () => {
        const list1 = list_ops_1.List.create();
        expect(list1.length()).toEqual(0);
    });
    xit('non-empty list', () => {
        const list1 = list_ops_1.List.create(1, 2, 3, 4);
        expect(list1.length()).toEqual(4);
    });
});
describe('returns a list of elements whose values equal the list value transformed by the mapping function', () => {
    xit('empty list', () => {
        const list1 = list_ops_1.List.create();
        expect(list1.map((el) => ++el)).toHaveValues();
    });
    xit('non-empty list', () => {
        const list1 = list_ops_1.List.create(1, 3, 5, 7);
        expect(list1.map((el) => ++el)).toHaveValues(2, 4, 6, 8);
    });
});
describe('folds (reduces) the given list from the left with a function', () => {
    xit('empty list', () => {
        const list1 = list_ops_1.List.create();
        expect(list1.foldl((acc, el) => el * acc, 2)).toEqual(2);
    });
    xit('direction independent function applied to non-empty list', () => {
        const list1 = list_ops_1.List.create(1, 2, 3, 4);
        expect(list1.foldl((acc, el) => acc + el, 5)).toEqual(15);
    });
    xit('direction dependent function applied to non-empty list', () => {
        const list1 = list_ops_1.List.create(1, 2, 3, 4);
        expect(list1.foldl((acc, el) => el / acc, 24)).toEqual(64);
    });
});
describe('folds (reduces) the given list from the right with a function', () => {
    xit('empty list', () => {
        const list1 = list_ops_1.List.create();
        expect(list1.foldr((acc, el) => el * acc, 2)).toEqual(2);
    });
    xit('direction independent function applied to non-empty list', () => {
        const list1 = list_ops_1.List.create(1, 2, 3, 4);
        expect(list1.foldr((acc, el) => acc + el, 5)).toEqual(15);
    });
    xit('direction dependent function applied to non-empty list', () => {
        const list1 = list_ops_1.List.create(1, 2, 3, 4);
        expect(list1.foldr((acc, el) => el / acc, 24)).toEqual(9);
    });
});
describe('reverse the elements of a list', () => {
    xit('empty list', () => {
        const list1 = list_ops_1.List.create();
        expect(list1.reverse()).toHaveValues();
    });
    xit('non-empty list', () => {
        const list1 = list_ops_1.List.create(1, 3, 5, 7);
        expect(list1.reverse()).toHaveValues(7, 5, 3, 1);
    });
    xit('list of lists is not flattened', () => {
        const list1 = list_ops_1.List.create([1, 2], [3], [], [4, 5, 6]);
        expect(list1.reverse()).toHaveValues([4, 5, 6], [], [3], [1, 2]);
    });
});
