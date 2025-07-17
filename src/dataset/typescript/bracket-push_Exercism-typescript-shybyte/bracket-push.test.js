"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bracket_push_1 = __importDefault(require("./bracket-push"));
describe('Bracket Push', () => {
    it('paired square brackets', () => {
        const bracketPush = new bracket_push_1.default('[]');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
    it('empty string', () => {
        const bracketPush = new bracket_push_1.default('');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
    it('unpaired brackets', () => {
        const bracketPush = new bracket_push_1.default('[[');
        expect(bracketPush.isPaired()).toBeFalsy();
    });
    it('wrong ordered brackets', () => {
        const bracketPush = new bracket_push_1.default('}{');
        expect(bracketPush.isPaired()).toBeFalsy();
    });
    it('wrong closing bracket', () => {
        const bracketPush = new bracket_push_1.default('{]');
        expect(bracketPush.isPaired()).toBeFalsy();
    });
    it('paired with whitespace', () => {
        const bracketPush = new bracket_push_1.default('{ }');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
    it('simple nested brackets', () => {
        const bracketPush = new bracket_push_1.default('{[]}');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
    it('several paired brackets', () => {
        const bracketPush = new bracket_push_1.default('{}[]');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
    it('paired and nested brackets', () => {
        const bracketPush = new bracket_push_1.default('([{}({}[])])');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
    it('unopened closing brackets', () => {
        const bracketPush = new bracket_push_1.default('{[)][]}');
        expect(bracketPush.isPaired()).toBeFalsy();
    });
    it('unpaired and nested brackets', () => {
        const bracketPush = new bracket_push_1.default('([{])');
        expect(bracketPush.isPaired()).toBeFalsy();
    });
    it('paired and wrong nested brackets', () => {
        const bracketPush = new bracket_push_1.default('[({]})');
        expect(bracketPush.isPaired()).toBeFalsy();
    });
    it('math expression', () => {
        const bracketPush = new bracket_push_1.default('(((185 + 223.85) * 15) - 543)/2');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
    it('complex latex expression', () => {
        const bracketPush = new bracket_push_1.default('\\left(\\begin{array}{cc} \\frac{1}{3} & x\\\\ \\mathrm{e}^{x} &... x^2 \\end{array}\\right)');
        expect(bracketPush.isPaired()).toBeTruthy();
    });
});
