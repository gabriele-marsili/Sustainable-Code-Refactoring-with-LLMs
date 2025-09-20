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
        this._allergen = allergenIndex & 0xFF; // Mask to 8 bits only
    }
    list() {
        const result = [];
        for (let i = 0; i < ALLERGENS.length; i++) {
            if (this._allergen & (1 << i)) {
                result.push(ALLERGENS[i]);
            }
        }
        return result;
    }
    allergicTo(allergen) {
        const index = ALLERGENS.indexOf(allergen);
        return index !== -1 && (this._allergen & (1 << index)) !== 0;
    }
}
exports.Allergies = Allergies;
