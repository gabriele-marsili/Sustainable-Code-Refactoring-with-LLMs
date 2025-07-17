"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rectangles_1 = __importDefault(require("./rectangles"));
describe('Rectangles', () => {
    it('no rows', () => {
        const expected = 0;
        const actual = rectangles_1.default.count([]);
        expect(actual).toEqual(expected);
    });
    it('no columns', () => {
        const expected = 0;
        const actual = rectangles_1.default.count(['']);
        expect(actual).toEqual(expected);
    });
    it('no rectangles', () => {
        const expected = 0;
        const actual = rectangles_1.default.count([' ']);
        expect(actual).toEqual(expected);
    });
    it('one rectangle', () => {
        const expected = 1;
        const actual = rectangles_1.default.count([
            '+-+',
            '| |',
            '+-+',
        ]);
        expect(actual).toEqual(expected);
    });
    it('two rectangles without shared parts', () => {
        const expected = 2;
        const actual = rectangles_1.default.count([
            '  +-+',
            '  | |',
            '+-+-+',
            '| |  ',
            '+-+  ',
        ]);
        expect(actual).toEqual(expected);
    });
    it('five rectangles with shared parts', () => {
        const expected = 5;
        const actual = rectangles_1.default.count([
            '  +-+',
            '  | |',
            '+-+-+',
            '| | |',
            '+-+-+',
        ]);
        expect(actual).toEqual(expected);
    });
    it('rectangle of height 1 is counted', () => {
        const expected = 1;
        const actual = rectangles_1.default.count([
            '+--+',
            '+--+',
        ]);
        expect(actual).toEqual(expected);
    });
    it('rectangle of width 1 is counted', () => {
        const expected = 1;
        const actual = rectangles_1.default.count([
            '++',
            '||',
            '++',
        ]);
        expect(actual).toEqual(expected);
    });
    it('1x1 square is counted', () => {
        const expected = 1;
        const actual = rectangles_1.default.count([
            '++',
            '++',
        ]);
        expect(actual).toEqual(expected);
    });
    it('only complete rectangles are counted', () => {
        const expected = 1;
        const actual = rectangles_1.default.count([
            '  +-+',
            '    |',
            '+-+-+',
            '| | -',
            '+-+-+',
        ]);
        expect(actual).toEqual(expected);
    });
    it('rectangles can be of different sizes', () => {
        const expected = 3;
        const actual = rectangles_1.default.count([
            '+------+----+',
            '|      |    |',
            '+---+--+    |',
            '|   |       |',
            '+---+-------+',
        ]);
        expect(actual).toEqual(expected);
    });
    it('corner is required for a rectangle to be complete', () => {
        const expected = 2;
        const actual = rectangles_1.default.count([
            '+------+----+',
            '|      |    |',
            '+------+    |',
            '|   |       |',
            '+---+-------+',
        ]);
        expect(actual).toEqual(expected);
    });
    it('large input with many rectangles', () => {
        const expected = 60;
        const actual = rectangles_1.default.count([
            '+---+--+----+',
            '|   +--+----+',
            '+---+--+    |',
            '|   +--+----+',
            '+---+--+--+-+',
            '+---+--+--+-+',
            '+------+  | |',
            '          +-+',
        ]);
        expect(actual).toEqual(expected);
    });
});
