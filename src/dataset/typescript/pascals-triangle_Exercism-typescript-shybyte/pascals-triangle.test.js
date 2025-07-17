"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pascals_triangle_1 = __importDefault(require("./pascals-triangle"));
describe('Triangle', () => {
    it('with one row', () => {
        expect(new pascals_triangle_1.default(1).rows).toEqual([[1]]);
    });
    it('with two rows', () => {
        expect(new pascals_triangle_1.default(2).rows).toEqual([[1], [1, 1]]);
    });
    it('with three rows', () => {
        expect(new pascals_triangle_1.default(3).rows).toEqual([[1], [1, 1], [1, 2, 1]]);
    });
    it('last row', () => {
        expect(new pascals_triangle_1.default(4).lastRow).toEqual([1, 3, 3, 1]);
    });
    it('fifth row', () => {
        expect(new pascals_triangle_1.default(5).lastRow).toEqual([1, 4, 6, 4, 1]);
    });
    it('twentieth row', () => {
        const twentieth = [1, 19, 171, 969, 3876, 11628, 27132, 50388, 75582, 92378, 92378, 75582, 50388, 27132, 11628, 3876, 969, 171, 19, 1];
        expect(new pascals_triangle_1.default(20).lastRow).toEqual(twentieth);
    });
});
