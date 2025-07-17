"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resistor_color_trio_1 = require("./resistor-color-trio");
describe('Resistor Colors', () => {
    it('Orange and orange and black', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['orange', 'orange', 'black'])).toEqual('33 ohms');
    });
    it('Blue and grey and brown', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['blue', 'grey', 'brown'])).toEqual('680 ohms');
    });
    it('Red and black and red', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['red', 'black', 'red'])).toEqual('2 kiloohms');
    });
    it('Green and brown and orange', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['green', 'brown', 'orange'])).toEqual('51 kiloohms');
    });
    it('Yellow and violet and yellow', () => {
        expect((0, resistor_color_trio_1.decodedResistorValue)(['yellow', 'violet', 'yellow'])).toEqual('470 kiloohms');
    });
});
