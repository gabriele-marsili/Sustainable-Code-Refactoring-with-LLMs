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
    }
    list() {
        return ALLERGENS.filter((_, index) => (this._allergen & (1 << index)) !== 0);
    }
    allergicTo(allergen) {
        const index = ALLERGENS.indexOf(allergen);
        return index !== -1 && (this._allergen & (1 << index)) !== 0;
    }
}
exports.Allergies = Allergies;
