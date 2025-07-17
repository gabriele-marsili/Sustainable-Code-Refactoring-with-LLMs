"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ocr_numbers_1 = __importDefault(require("./ocr-numbers"));
describe('ocr', () => {
    it('recognizes zero', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            '| |\n' +
            '|_|\n' +
            '   ')).toBe('0');
    });
    it('recognizes one', () => {
        expect(ocr_numbers_1.default.convert('   \n' +
            '  |\n' +
            '  |\n' +
            '   ')).toBe('1');
    });
    it('recognizes two', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            ' _|\n' +
            '|_ \n' +
            '   ')).toBe('2');
    });
    it('recognizes three', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            ' _|\n' +
            ' _|\n' +
            '   ')).toBe('3');
    });
    it('recognizes four', () => {
        expect(ocr_numbers_1.default.convert('   \n' +
            '|_|\n' +
            '  |\n' +
            '   ')).toBe('4');
    });
    it('recognizes five', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            '|_ \n' +
            ' _|\n' +
            '   ')).toBe('5');
    });
    it('recognizes six', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            '|_ \n' +
            '|_|\n' +
            '   ')).toBe('6');
    });
    it('recognizes seven', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            '  |\n' +
            '  |\n' +
            '   ')).toBe('7');
    });
    it('recognizes eight', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            '|_|\n' +
            '|_|\n' +
            '   ')).toBe('8');
    });
    it('recognizes nine', () => {
        expect(ocr_numbers_1.default.convert(' _ \n' +
            '|_|\n' +
            ' _|\n' +
            '   ')).toBe('9');
    });
    it('recognizes ten', () => {
        expect(ocr_numbers_1.default.convert('    _ \n' +
            '  || |\n' +
            '  ||_|\n' +
            '      ')).toBe('10');
    });
    it('identifies garble', () => {
        expect(ocr_numbers_1.default.convert('   \n' +
            '| |\n' +
            '| |\n' +
            '   ')).toBe('?');
    });
    it('converts 110101100', () => {
        expect(ocr_numbers_1.default.convert('       _     _        _  _ \n' +
            '  |  || |  || |  |  || || |\n' +
            '  |  ||_|  ||_|  |  ||_||_|\n' +
            '                           ')).toBe('110101100');
    });
    it('identifies garble mixed in', () => {
        expect(ocr_numbers_1.default.convert('       _     _           _ \n' +
            '  |  || |  || |     || || |\n' +
            '  |  | _|  ||_|  |  ||_||_|\n' +
            '                           ')).toBe('11?10?1?0');
    });
    it('converts 1234567890', () => {
        expect(ocr_numbers_1.default.convert('    _  _     _  _  _  _  _  _ \n' +
            '  | _| _||_||_ |_   ||_||_|| |\n' +
            '  ||_  _|  | _||_|  ||_| _||_|\n' +
            '                              ')).toBe('1234567890');
    });
    it('converts 123 456 789', () => {
        expect(ocr_numbers_1.default.convert('    _  _ \n' +
            '  | _| _|\n' +
            '  ||_  _|\n' +
            '         \n' +
            '    _  _ \n' +
            '|_||_ |_ \n' +
            '  | _||_|\n' +
            '         \n' +
            ' _  _  _ \n' +
            '  ||_||_|\n' +
            '  ||_| _|\n' +
            '         ')).toBe('123,456,789');
    });
});
