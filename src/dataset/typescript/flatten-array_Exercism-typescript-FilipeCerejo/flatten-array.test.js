"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flatten_array_1 = require("./flatten-array");
describe('Flatten Array', () => {
    it('no nesting', () => {
        const expected = [0, 1, 2];
        expect((0, flatten_array_1.flatten)([0, 1, 2])).toEqual(expected);
    });
    xit('flattens array with just integers present', () => {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8];
        expect((0, flatten_array_1.flatten)([1, [2, 3, 4, 5, 6, 7], 8])).toEqual(expected);
    });
    xit('5 level nesting', () => {
        const expected = [0, 2, 2, 3, 8, 100, 4, 50, -2];
        expect((0, flatten_array_1.flatten)([0, 2, [[2, 3], 8, 100, 4, [[[50]]]], -2])).toEqual(expected);
    });
    xit('6 level nesting', () => {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8];
        expect((0, flatten_array_1.flatten)([1, [2, [[3]], [4, [[5]]], 6, 7], 8])).toEqual(expected);
    });
    xit('6 level nest list with null values', () => {
        const expected = [0, 2, 2, 3, 8, 100, -2];
        expect((0, flatten_array_1.flatten)([0, 2, [[2, 3], 8, [[100]], undefined, [[undefined]]], -2])).toEqual(expected);
    });
    xit('all values in nested list are null', () => {
        const expected = [];
        expect((0, flatten_array_1.flatten)([
            undefined,
            [[[undefined]]],
            undefined,
            undefined,
            [[undefined, undefined], undefined],
            undefined,
        ])).toEqual(expected);
    });
});
