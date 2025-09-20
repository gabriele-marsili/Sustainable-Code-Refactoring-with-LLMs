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
        this._allergen = allergenIndex & 0xFF;
    }
    list() {
        const result = [];
        let allergenValue = this._allergen;
        let index = 0;
        while (allergenValue > 0 && index < ALLERGENS.length) {
            if (allergenValue & 1) {
                result.push(ALLERGENS[index]);
            }
            allergenValue >>>= 1;
            index++;
        }
        return result;
    }
    allergicTo(allergen) {
        const index = ALLERGENS.indexOf(allergen);
        return index !== -1 && (this._allergen & (1 << index)) !== 0;
    }
}
exports.Allergies = Allergies;
