"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resistor_color_trio_1 = require("./resistor-color-trio");
describe('Resistor Colors', () => {
    it('Orange and orange and black', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['orange', 'orange', 'black'])).toEqual('33 ohms');
    });
    xit('Blue and grey and brown', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['blue', 'grey', 'brown'])).toEqual('680 ohms');
    });
    xit('Red and black and red', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['red', 'black', 'red'])).toEqual('2 kiloohms');
    });
    xit('Green and brown and orange', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['green', 'brown', 'orange'])).toEqual('51 kiloohms');
    });
    xit('Yellow and violet and yellow', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['yellow', 'violet', 'yellow'])).toEqual('470 kiloohms');
    });
    xit('Blue and violet and blue', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['blue', 'violet', 'blue'])).toEqual('67 megaohms');
    });
    xit('Minimum possible value', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['black', 'black', 'black'])).toEqual('0 ohms');
    });
    xit('Maximum possible value', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['white', 'white', 'white'])).toEqual('99 gigaohms');
    });
    xit('First two colors make an invalid octal number', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['black', 'grey', 'black'])).toEqual('8 ohms');
    });
    xit('Ignore extra colors', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['blue', 'green', 'yellow', 'orange'])).toEqual('650 kiloohms');
    });
});
