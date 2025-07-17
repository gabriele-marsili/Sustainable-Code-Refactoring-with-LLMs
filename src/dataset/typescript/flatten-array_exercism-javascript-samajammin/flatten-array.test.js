"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flatten_array_1 = __importDefault(require("./flatten-array"));
describe('Flatten Array', () => {
    it('no nesting', () => {
        const expected = [0, 1, 2];
        expect(flatten_array_1.default.flatten([0, 1, 2])).toEqual(expected);
    });
    it('flattens array with just integers present', () => {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(flatten_array_1.default.flatten([1, [2, 3, 4, 5, 6, 7], 8])).toEqual(expected);
    });
    it('5 level nesting', () => {
        const expected = [0, 2, 2, 3, 8, 100, 4, 50, -2];
        expect(flatten_array_1.default.flatten([0, 2, [[2, 3], 8, 100, 4, [[[50]]]], -2])).toEqual(expected);
    });
    it('6 level nesting', () => {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(flatten_array_1.default.flatten([1, [2, [[3]], [4, [[5]]], 6, 7], 8])).toEqual(expected);
    });
    it('6 level nest list with null values', () => {
        const expected = [0, 2, 2, 3, 8, 100, -2];
        expect(flatten_array_1.default.flatten([
            0,
            2,
            [[2, 3], 8, [[100]], undefined, [[undefined]]],
            -2
        ])).toEqual(expected);
    });
    it('all values in nested list are null', () => {
        const expected = [];
        expect(flatten_array_1.default.flatten([
            undefined,
            [[[undefined]]],
            undefined,
            undefined,
            [[undefined, undefined], undefined],
            undefined
        ])).toEqual(expected);
    });
});
