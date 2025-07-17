"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allergies = void 0;
const ALLERGENS = [
    'eggs',
    'peanuts',
    'shellfish',
    'strawberries',
    'tomatoes',
    'chocolate',
    'pollen',
    'cats',
];
class Allergies {
    constructor(allergenIndex) {
        this._allergen = allergenIndex;
        this._list = [];
        this.calculate();
    }
    calculate() {
        let bit = this._allergen.toString(2);
        this._list = [];
        for (let b = bit.length - 1; b >= 0; b--) {
            if (bit[b] === '1' && ALLERGENS[bit.length - 1 - b])
                this._list.push(ALLERGENS[bit.length - 1 - b]);
        }
    }
    list() {
        return this._list;
    }
    allergicTo(allergen) {
        return this._list.some((a) => a === allergen);
    }
}
exports.Allergies = Allergies;
