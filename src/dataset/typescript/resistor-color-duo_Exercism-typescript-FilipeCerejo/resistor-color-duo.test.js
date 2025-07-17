"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resistor_color_duo_1 = require("./resistor-color-duo");
describe('Resistor Colors', () => {
    it('Brown and black', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['brown', 'black'])).toEqual(10);
    });
    xit('Blue and grey', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['blue', 'grey'])).toEqual(68);
    });
    xit('Yellow and violet', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['yellow', 'violet'])).toEqual(47);
    });
    xit('Orange and orange', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['orange', 'orange'])).toEqual(33);
    });
    xit('Ignore additional colors', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['green', 'brown', 'orange'])).toEqual(51);
    });
});
