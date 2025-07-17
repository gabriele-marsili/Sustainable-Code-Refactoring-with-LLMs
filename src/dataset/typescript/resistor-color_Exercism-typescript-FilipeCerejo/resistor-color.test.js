"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resistor_color_1 = require("./resistor-color");
describe('color code', () => {
    it('Black', () => {
        expect((0, resistor_color_1.colorCode)('black')).toEqual(0);
    });
    xit('White', () => {
        expect((0, resistor_color_1.colorCode)('white')).toEqual(9);
    });
    xit('Orange', () => {
        expect((0, resistor_color_1.colorCode)('orange')).toEqual(3);
    });
});
describe('Colors', () => {
    xit('returns all colors', () => {
        expect(resistor_color_1.COLORS).toEqual([
            'black',
            'brown',
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'violet',
            'grey',
            'white',
        ]);
    });
});
