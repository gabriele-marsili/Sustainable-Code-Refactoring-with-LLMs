"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minesweeper_1 = require("./minesweeper");
describe('Minesweeper annotate', () => {
    it('handles no rows', () => {
        expect((0, minesweeper_1.annotate)([])).toEqual([]);
    });
    xit('handles no columns', () => {
        expect((0, minesweeper_1.annotate)([''])).toEqual(['']);
    });
    xit('handles no mines', () => {
        const input = ['   ', '   ', '   '];
        const expected = ['   ', '   ', '   '];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles board with only mines', () => {
        const input = ['***', '***', '***'];
        const expected = ['***', '***', '***'];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles mine surrounded by spaces', () => {
        const input = ['   ', ' * ', '   '];
        const expected = ['111', '1*1', '111'];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles space surrounded by mines', () => {
        const input = ['***', '* *', '***'];
        const expected = ['***', '*8*', '***'];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles horizontal line', () => {
        const input = [' * * '];
        const expected = ['1*2*1'];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles horizontal line, mines at edges', () => {
        const input = ['*   *'];
        const expected = ['*1 1*'];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles vertical line', () => {
        const input = [' ', '*', ' ', '*', ' '];
        const expected = ['1', '*', '2', '*', '1'];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles vertical line, mines at edges', () => {
        const input = ['*', ' ', ' ', ' ', '*'];
        const expected = ['*', '1', ' ', '1', '*'];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles cross', () => {
        const input = ['  *  ', '  *  ', '*****', '  *  ', '  *  '];
        const expected = [' 2*2 ', '25*52', '*****', '25*52', ' 2*2 '];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
    xit('handles large board', () => {
        const input = [' *  * ', '  *   ', '    * ', '   * *', ' *  * ', '      '];
        const expected = [
            '1*22*1',
            '12*322',
            ' 123*2',
            '112*4*',
            '1*22*2',
            '111111',
        ];
        expect((0, minesweeper_1.annotate)(input)).toEqual(expected);
    });
});
