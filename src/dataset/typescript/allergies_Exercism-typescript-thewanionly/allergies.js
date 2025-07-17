"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allergies = void 0;
const Allergens = {
    cats: 128,
    pollen: 64,
    chocolate: 32,
    tomatoes: 16,
    strawberries: 8,
    shellfish: 4,
    peanuts: 2,
    eggs: 1
};
const ExcludedAllergenScores = [1024, 512, 256];
class Allergies {
    constructor(allergenIndex) {
        this.allergens = [];
        let currAllergenScore = allergenIndex;
        let excludedAllergenScore = ExcludedAllergenScores.find((score) => currAllergenScore > score) || 0;
        // deduct the max excluded allergen score from currAllergenScore
        while (excludedAllergenScore) {
            currAllergenScore -= excludedAllergenScore;
            excludedAllergenScore = ExcludedAllergenScores.find((score) => currAllergenScore > score) || 0;
        }
        // loop over the allergens and based on the currAllergenScore, create the allergens list
        if (allergenIndex > 0) {
            for (let allergen in Allergens) {
                const allergenScore = Allergens[allergen];
                if (allergenScore <= currAllergenScore) {
                    this.allergens.unshift(allergen);
                    currAllergenScore -= allergenScore;
                }
            }
        }
    }
    list() {
        return this.allergens;
    }
    allergicTo(allergen) {
        return this.allergens.includes(allergen);
    }
}
exports.Allergies = Allergies;
