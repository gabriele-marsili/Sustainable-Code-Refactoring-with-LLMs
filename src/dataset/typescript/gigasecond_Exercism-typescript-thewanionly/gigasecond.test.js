"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gigasecond_1 = require("./gigasecond");
describe('Gigasecond', () => {
    it('tells a gigasecond anniversary since midnight', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.UTC(2015, 8, 14)));
        const expectedDate = new Date(Date.UTC(2047, 4, 23, 1, 46, 40));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('tells the anniversary is next day when you are born at night', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.UTC(2015, 8, 14, 23, 59, 59)));
        const expectedDate = new Date(Date.UTC(2047, 4, 24, 1, 46, 39));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('even works before 1970 (beginning of Unix epoch )', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.UTC(1959, 6, 19, 5, 13, 45)));
        const expectedDate = new Date(Date.UTC(1991, 2, 27, 7, 0, 25));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('make sure calling "date" doesn\'t mutate value', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.UTC(1959, 6, 19, 5, 13, 45)));
        const expectedDate = new Date(Date.UTC(1991, 2, 27, 7, 0, 25));
        gs.date();
        expect(gs.date()).toEqual(expectedDate);
    });
});
