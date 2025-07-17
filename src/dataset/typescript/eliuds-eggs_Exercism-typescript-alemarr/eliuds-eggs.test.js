"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eliuds_eggs_1 = require("./eliuds-eggs");
describe('EliudsEggs', () => {
    it('0 eggs', () => {
        const expected = 0;
        const actual = (0, eliuds_eggs_1.eggCount)(0);
        expect(actual).toEqual(expected);
    });
    it('1 egg', () => {
        const expected = 1;
        const actual = (0, eliuds_eggs_1.eggCount)(16);
        expect(actual).toEqual(expected);
    });
    it('4 eggs', () => {
        const expected = 4;
        const actual = (0, eliuds_eggs_1.eggCount)(89);
        expect(actual).toEqual(expected);
    });
    it('13 eggs', () => {
        const expected = 13;
        const actual = (0, eliuds_eggs_1.eggCount)(2000000000);
        expect(actual).toEqual(expected);
    });
});
