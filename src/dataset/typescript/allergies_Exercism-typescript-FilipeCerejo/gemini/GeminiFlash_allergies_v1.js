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
        this._list = this.calculate();
    }
    calculate() {
        const result = [];
        for (let i = 0; i < ALLERGENS.length; i++) {
            if (this._allergen & (1 << i)) {
                result.push(ALLERGENS[i]);
            }
        }
        return result;
    }
    list() {
        return this._list;
    }
    allergicTo(allergen) {
        return this._list.includes(allergen);
    }
}
exports.Allergies = Allergies;
