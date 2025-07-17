"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_ops_1 = __importDefault(require("./list-ops"));
describe('append entries to a list and return the new list', () => {
    it('empty lists', () => {
        const list1 = new list_ops_1.default();
        const list2 = new list_ops_1.default();
        expect(list1.append(list2)).toEqual(new list_ops_1.default());
    });
    it('empty list to list', () => {
        const list1 = new list_ops_1.default([1, 2, 3, 4]);
        const list2 = new list_ops_1.default();
        expect(list1.append(list2)).toEqual(list1);
    });
    it('non-empty lists', () => {
        const list1 = new list_ops_1.default([1, 2]);
        const list2 = new list_ops_1.default([2, 3, 4, 5]);
        expect(list1.append(list2).values).toEqual([1, 2, 2, 3, 4, 5]);
    });
});
describe('concat lists and lists of lists into new list', () => {
    it('empty list', () => {
        const list1 = new list_ops_1.default();
        const list2 = new list_ops_1.default([]);
        expect(list1.concat(list2).values).toEqual([]);
    });
    it('list of lists', () => {
        const list1 = new list_ops_1.default([1, 2]);
        const list2 = new list_ops_1.default([3]);
        const list3 = new list_ops_1.default([]);
        const list4 = new list_ops_1.default([4, 5, 6]);
        const listOfLists = new list_ops_1.default([list2, list3, list4]);
        expect(list1.concat(listOfLists).values).toEqual([1, 2, 3, 4, 5, 6]);
    });
});
describe('filter list returning only values that satisfy the filter function', () => {
    it('empty list', () => {
        const list1 = new list_ops_1.default([]);
        expect(list1.filter((el) => el % 2 === 1).values).toEqual([]);
    });
    it('non empty list', () => {
        const list1 = new list_ops_1.default([1, 2, 3, 5]);
        expect(list1.filter((el) => el % 2 === 1).values).toEqual([
            1,
            3,
            5
        ]);
    });
});
describe('returns the length of a list', () => {
    it('empty list', () => {
        const list1 = new list_ops_1.default();
        expect(list1.length()).toEqual(0);
    });
    it('non-empty list', () => {
        const list1 = new list_ops_1.default([1, 2, 3, 4]);
        expect(list1.length()).toEqual(4);
    });
});
describe('returns a list of elements whose values equal the list value transformed by the mapping function', () => {
    it('empty list', () => {
        const list1 = new list_ops_1.default();
        expect(list1.map((el) => ++el).values).toEqual([]);
    });
    it('non-empty list', () => {
        const list1 = new list_ops_1.default([1, 3, 5, 7]);
        expect(list1.map((el) => ++el).values).toEqual([2, 4, 6, 8]);
    });
});
describe('folds (reduces) the given list from the left with a function', () => {
    it('empty list', () => {
        const list1 = new list_ops_1.default();
        expect(list1.foldl((acc, el) => el / acc, 2)).toEqual(2);
    });
    it('division of integers', () => {
        const list1 = new list_ops_1.default([1, 2, 3, 4]);
        expect(list1.foldl((acc, el) => el / acc, 24)).toEqual(64);
    });
});
describe('folds (reduces) the given list from the right with a function', () => {
    it('empty list', () => {
        const list1 = new list_ops_1.default();
        expect(list1.foldr((acc, el) => el / acc, 2)).toEqual(2);
    });
    it('division of integers', () => {
        const list1 = new list_ops_1.default([1, 2, 3, 4]);
        expect(list1.foldr((acc, el) => el / acc, 24)).toEqual(9);
    });
});
describe('reverse the elements of a list', () => {
    it('empty list', () => {
        const list1 = new list_ops_1.default();
        expect(list1.reverse().values).toEqual([]);
    });
    it('non-empty list', () => {
        const list1 = new list_ops_1.default([1, 3, 5, 7]);
        expect(list1.reverse().values).toEqual([7, 5, 3, 1]);
    });
});
