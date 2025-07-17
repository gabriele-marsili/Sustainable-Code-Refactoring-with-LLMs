"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sum_of_multiples_1 = __importDefault(require("./sum-of-multiples"));
describe('SumOfMultiples', () => {
    it('to 1', () => {
        expect((0, sum_of_multiples_1.default)([3, 5]).to(1)).toBe(0);
    });
    it('to 3', () => {
        expect((0, sum_of_multiples_1.default)([3, 5]).to(4)).toBe(3);
    });
    it('to 10', () => {
        expect((0, sum_of_multiples_1.default)([3, 5]).to(10)).toBe(23);
    });
    it('to 100', () => {
        expect((0, sum_of_multiples_1.default)([3, 5]).to(100)).toBe(2318);
    });
    it('to 1000', () => {
        expect((0, sum_of_multiples_1.default)([3, 5]).to(1000)).toBe(233168);
    });
    it('[7, 13, 17] to 20', () => {
        expect((0, sum_of_multiples_1.default)([7, 13, 17]).to(20)).toBe(51);
    });
    it('[4, 6] to 15', () => {
        expect((0, sum_of_multiples_1.default)([4, 6]).to(15)).toBe(30);
    });
    it('[5, 6, 8] to 150', () => {
        expect((0, sum_of_multiples_1.default)([5, 6, 8]).to(150)).toBe(4419);
    });
    it('[43, 47] to 10000', () => {
        expect((0, sum_of_multiples_1.default)([43, 47]).to(10000)).toBe(2203160);
    });
});
