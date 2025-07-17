"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resistor_color_duo_1 = require("./resistor-color-duo");
describe('Resistor Colors', () => {
    it('Brown and black', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['brown', 'black'])).toEqual(10);
    });
    it('Blue and grey', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['blue', 'grey'])).toEqual(68);
    });
    it('White and red', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['white', 'red'])).toEqual(92);
    });
    it('Yellow and violet', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['yellow', 'violet'])).toEqual(47);
    });
    it('Orange and orange', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['orange', 'orange'])).toEqual(33);
    });
    it('Ignore additional colors', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['green', 'brown', 'orange'])).toEqual(51);
    });
    it('Black and brown, one-digit', () => {
        expect((0, resistor_color_duo_1.decodedValue)(['black', 'brown'])).toEqual(1);
    });
});
