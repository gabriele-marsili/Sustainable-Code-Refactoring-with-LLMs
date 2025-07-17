"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pythagorean_triplet_1 = __importDefault(require("./pythagorean-triplet"));
describe('Triplet', () => {
    it('calculates the sum', () => {
        expect(new pythagorean_triplet_1.default(3, 4, 5).sum()).toBe(12);
    });
    it('calculates the product', () => {
        expect(new pythagorean_triplet_1.default(3, 4, 5).product()).toBe(60);
    });
    it('can recognize a pythagorean triplet', () => {
        expect(new pythagorean_triplet_1.default(3, 4, 5).isPythagorean()).toBe(true);
    });
    it('can recognize a non pythagorean triplet', () => {
        expect(new pythagorean_triplet_1.default(5, 6, 7).isPythagorean()).toBe(false);
    });
    it('can make triplets up to 10', () => {
        const triplets = pythagorean_triplet_1.default.where(10);
        const products = triplets.sort().map((triplet) => triplet.product());
        expect(products).toEqual([60, 480]);
    });
    it('can make triplets 11 through 20', () => {
        const triplets = pythagorean_triplet_1.default.where(20, 11);
        const products = triplets.sort().map((triplet) => triplet.product());
        expect(products).toEqual([3840]);
    });
    it('can filter on sum', () => {
        const triplets = pythagorean_triplet_1.default.where(100, undefined, 180);
        const products = triplets.sort().map((triplet) => triplet.product());
        expect(products).toEqual([118080, 168480, 202500]);
    });
});
