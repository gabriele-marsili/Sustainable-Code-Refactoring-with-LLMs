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
        this._list = this.calculate();
    }
    calculate() {
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
    list() {
        return this._list;
    }
    allergicTo(allergen) {
        const allergenIndex = ALLERGENS.indexOf(allergen);
        return allergenIndex !== -1 && (this._allergen & (1 << allergenIndex)) !== 0;
    }
}
exports.Allergies = Allergies;
