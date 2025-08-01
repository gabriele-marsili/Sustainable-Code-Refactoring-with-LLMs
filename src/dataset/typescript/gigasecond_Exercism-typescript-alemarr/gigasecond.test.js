"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gigasecond_1 = require("./gigasecond");
describe('Gigasecond', () => {
    it('date only specification of time', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.parse('2011-04-25')));
        const expectedDate = new Date(Date.parse('2043-01-01T01:46:40Z'));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('second test for date only specification of time', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.parse('1977-06-13')));
        const expectedDate = new Date(Date.parse('2009-02-19T01:46:40Z'));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('third test for date only specification of time', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.parse('1959-07-19')));
        const expectedDate = new Date(Date.parse('1991-03-27T01:46:40Z'));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('full time specified', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.parse('2015-01-24T22:00:00Z')));
        const expectedDate = new Date(Date.parse('2046-10-02T23:46:40Z'));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('full time with day roll-over', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.parse('2015-01-24T23:59:59Z')));
        const expectedDate = new Date(Date.parse('2046-10-03T01:46:39Z'));
        expect(gs.date()).toEqual(expectedDate);
    });
    it('does not mutate the input', () => {
        const gs = new gigasecond_1.Gigasecond(new Date(Date.parse('2015-01-24T23:59:59Z')));
        const expectedDate = new Date(Date.parse('2046-10-03T01:46:39Z'));
        gs.date();
        expect(gs.date()).toEqual(expectedDate);
    });
});
