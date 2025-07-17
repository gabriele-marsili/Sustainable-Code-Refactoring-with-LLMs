"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sublist_1 = require("./sublist");
describe('Sublist', () => {
    it('empty lists', () => {
        const listOne = new sublist_1.List();
        const listTwo = new sublist_1.List();
        const expected = 'equal';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('empty list within non empty list', () => {
        const listOne = new sublist_1.List();
        const listTwo = new sublist_1.List(1, 2, 3);
        const expected = 'sublist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('non empty list contains empty list', () => {
        const listOne = new sublist_1.List(1, 2, 3);
        const listTwo = new sublist_1.List();
        const expected = 'superlist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('list equals itself', () => {
        const listOne = new sublist_1.List(1, 2, 3);
        const listTwo = new sublist_1.List(1, 2, 3);
        const expected = 'equal';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('different lists', () => {
        const listOne = new sublist_1.List(1, 2, 3);
        const listTwo = new sublist_1.List(2, 3, 4);
        const expected = 'unequal';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('false start', () => {
        const listOne = new sublist_1.List(1, 2, 5);
        const listTwo = new sublist_1.List(0, 1, 2, 3, 1, 2, 5, 6);
        const expected = 'sublist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('consecutive', () => {
        const listOne = new sublist_1.List(1, 1, 2);
        const listTwo = new sublist_1.List(0, 1, 1, 1, 2, 1, 2);
        const expected = 'sublist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('sublist at start', () => {
        const listOne = new sublist_1.List(0, 1, 2);
        const listTwo = new sublist_1.List(0, 1, 2, 3, 4, 5);
        const expected = 'sublist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('sublist in middle', () => {
        const listOne = new sublist_1.List(2, 3, 4);
        const listTwo = new sublist_1.List(0, 1, 2, 3, 4, 5);
        const expected = 'sublist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('sublist at end', () => {
        const listOne = new sublist_1.List(3, 4, 5);
        const listTwo = new sublist_1.List(0, 1, 2, 3, 4, 5);
        const expected = 'sublist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('at start of superlist', () => {
        const listOne = new sublist_1.List(0, 1, 2, 3, 4, 5);
        const listTwo = new sublist_1.List(0, 1, 2);
        const expected = 'superlist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('in middle of superlist', () => {
        const listOne = new sublist_1.List(0, 1, 2, 3, 4, 5);
        const listTwo = new sublist_1.List(2, 3);
        const expected = 'superlist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('at end of superlist', () => {
        const listOne = new sublist_1.List(0, 1, 2, 3, 4, 5);
        const listTwo = new sublist_1.List(3, 4, 5);
        const expected = 'superlist';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('first list missing element from second list', () => {
        const listOne = new sublist_1.List(1, 3);
        const listTwo = new sublist_1.List(1, 2, 3);
        const expected = 'unequal';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('second list missing element from first list', () => {
        const listOne = new sublist_1.List(1, 2, 3);
        const listTwo = new sublist_1.List(1, 3);
        const expected = 'unequal';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('order matters to a list', () => {
        const listOne = new sublist_1.List(1, 2, 3);
        const listTwo = new sublist_1.List(3, 2, 1);
        const expected = 'unequal';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
    xit('same digits but different numbers', () => {
        const listOne = new sublist_1.List(1, 0, 1);
        const listTwo = new sublist_1.List(10, 1);
        const expected = 'unequal';
        expect(listOne.compare(listTwo)).toEqual(expected);
    });
});
