"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minesweeper_1 = __importDefault(require("./minesweeper"));
describe('Minesweeper()', () => {
    let minesweeper;
    beforeEach(() => {
        minesweeper = new minesweeper_1.default();
    });
    it('handles no rows', () => {
        expect(minesweeper.annotate([])).toEqual([]);
    });
    it('handles no columns', () => {
        expect(minesweeper.annotate([''])).toEqual(['']);
    });
    it('handles no mines', () => {
        const input = [
            '   ',
            '   ',
            '   ',
        ];
        const expected = [
            '   ',
            '   ',
            '   ',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles board with only mines', () => {
        const input = [
            '***',
            '***',
            '***',
        ];
        const expected = [
            '***',
            '***',
            '***',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles mine surrounded by spaces', () => {
        const input = [
            '   ',
            ' * ',
            '   ',
        ];
        const expected = [
            '111',
            '1*1',
            '111',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles space surrounded by mines', () => {
        const input = [
            '***',
            '* *',
            '***',
        ];
        const expected = [
            '***',
            '*8*',
            '***',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles space surrounded by mines', () => {
        const input = [
            '***',
            '* *',
            '***',
        ];
        const expected = [
            '***',
            '*8*',
            '***',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles horizontal line', () => {
        const input = [' * * '];
        const expected = ['1*2*1'];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles horizontal line, mines at edges', () => {
        const input = ['*   *'];
        const expected = ['*1 1*'];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles vertical line', () => {
        const input = [
            ' ',
            '*',
            ' ',
            '*',
            ' ',
        ];
        const expected = [
            '1',
            '*',
            '2',
            '*',
            '1',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles vertical line, mines at edges', () => {
        const input = [
            '*',
            ' ',
            ' ',
            ' ',
            '*',
        ];
        const expected = [
            '*',
            '1',
            ' ',
            '1',
            '*',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles cross', () => {
        const input = [
            '  *  ',
            '  *  ',
            '*****',
            '  *  ',
            '  *  ',
        ];
        const expected = [
            ' 2*2 ',
            '25*52',
            '*****',
            '25*52',
            ' 2*2 ',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
    it('handles large board', () => {
        const input = [
            ' *  * ',
            '  *   ',
            '    * ',
            '   * *',
            ' *  * ',
            '      ',
        ];
        const expected = [
            '1*22*1',
            '12*322',
            ' 123*2',
            '112*4*',
            '1*22*2',
            '111111',
        ];
        expect(minesweeper.annotate(input)).toEqual(expected);
    });
});
