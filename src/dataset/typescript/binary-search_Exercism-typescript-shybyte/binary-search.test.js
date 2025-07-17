"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const binary_search_1 = __importDefault(require("./binary-search"));
describe("BinarySearch", () => {
    const sortedArray = [1, 2, 3, 4, 5, 6];
    const sortedArrayOfOddLength = [0, 1, 2, 2, 3, 10, 12];
    const unsortedArray = [10, 2, 5, 1];
    it("should require a sorted array", () => {
        const invalidBinarySearch = new binary_search_1.default(unsortedArray);
        const validBinarySearch = new binary_search_1.default(sortedArray);
        expect(typeof invalidBinarySearch.array).toEqual("undefined");
        expect(Array.isArray(validBinarySearch.array)).toEqual(true);
    });
    it("should find the correct index of an included value", () => {
        expect(new binary_search_1.default(sortedArray).indexOf(3)).toEqual(2);
    });
    it("should search the middle of the array", () => {
        expect(new binary_search_1.default(sortedArrayOfOddLength).indexOf(2)).toEqual(3);
    });
    it("should return -1 for a value not in the array", () => {
        expect(new binary_search_1.default(sortedArray).indexOf(10)).toEqual(-1);
    });
});
