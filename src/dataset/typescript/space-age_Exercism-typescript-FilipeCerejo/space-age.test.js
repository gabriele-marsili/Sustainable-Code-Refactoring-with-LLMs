"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const space_age_1 = require("./space-age");
describe('Space Age', () => {
    it('age on Earth', () => {
        expect((0, space_age_1.age)('earth', 1000000000)).toEqual(31.69);
    });
    xit('age on Mercury', () => {
        expect((0, space_age_1.age)('mercury', 2134835688)).toEqual(280.88);
    });
    xit('age on Venus', () => {
        expect((0, space_age_1.age)('venus', 189839836)).toEqual(9.78);
    });
    xit('age on Mars', () => {
        expect((0, space_age_1.age)('mars', 2129871239)).toEqual(35.88);
    });
    xit('age on Jupiter', () => {
        expect((0, space_age_1.age)('jupiter', 901876382)).toEqual(2.41);
    });
    xit('age on Saturn', () => {
        expect((0, space_age_1.age)('saturn', 2000000000)).toEqual(2.15);
    });
    xit('age on Uranus', () => {
        expect((0, space_age_1.age)('uranus', 1210123456)).toEqual(0.46);
    });
    xit('age on Neptune', () => {
        expect((0, space_age_1.age)('neptune', 1821023456)).toEqual(0.35);
    });
});
