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
    constructor(allergenScore) {
        this._allergenScore = allergenScore;
    }
    list() {
        const result = [];
        for (let i = 0; i < ALLERGENS.length; i++) {
            if ((this._allergenScore >> i) & 1) {
                result.push(ALLERGENS[i]);
            }
        }
        return result;
    }
    allergicTo(allergen) {
        const allergenIndex = ALLERGENS.indexOf(allergen);
        if (allergenIndex === -1) {
            return false;
        }
        return ((this._allergenScore >> allergenIndex) & 1) === 1;
    }
}
exports.Allergies = Allergies;
