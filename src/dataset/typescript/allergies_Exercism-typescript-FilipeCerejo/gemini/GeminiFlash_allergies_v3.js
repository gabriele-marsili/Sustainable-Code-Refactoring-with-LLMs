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
const ALLERGEN_SCORES = {
    'eggs': 1,
    'peanuts': 2,
    'shellfish': 4,
    'strawberries': 8,
    'tomatoes': 16,
    'chocolate': 32,
    'pollen': 64,
    'cats': 128,
};
class Allergies {
    constructor(allergenIndex) {
        this._allergen = allergenIndex;
        this._list = this.calculate();
    }
    calculate() {
        const result = [];
        let remainingScore = this._allergen;
        for (let i = ALLERGENS.length - 1; i >= 0; i--) {
            const allergen = ALLERGENS[i];
            const allergenScore = 1 << i;
            if (remainingScore >= allergenScore) {
                result.unshift(allergen);
                remainingScore -= allergenScore;
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
