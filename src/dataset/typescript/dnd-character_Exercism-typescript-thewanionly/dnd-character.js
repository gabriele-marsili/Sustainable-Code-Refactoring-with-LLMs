"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
class DnDCharacter {
    constructor() {
        this.hitpoints = 0;
        this.strength = 0;
        this.dexterity = 0;
        this.constitution = 0;
        this.intelligence = 0;
        this.wisdom = 0;
        this.charisma = 0;
        this.strength = DnDCharacter.generateAbilityScore();
        this.dexterity = DnDCharacter.generateAbilityScore();
        this.constitution = DnDCharacter.generateAbilityScore();
        this.intelligence = DnDCharacter.generateAbilityScore();
        this.wisdom = DnDCharacter.generateAbilityScore();
        this.charisma = DnDCharacter.generateAbilityScore();
        this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
    }
    static generateAbilityScore() {
        const results = [];
        // Generate random number from 1 to 6 four times and store in results
        for (let i = 0; i < 4; i++) {
            results.push(Math.floor(Math.random() * 6) + 1);
        }
        // Remove the smallest number
        results.sort((a, b) => a - b).splice(0, 1);
        // Add all the remaining numbers
        return results.reduce((acc, curr) => acc + curr, 0);
    }
    static getModifierFor(abilityValue) {
        return Math.floor((abilityValue - 10) / 2);
    }
}
exports.DnDCharacter = DnDCharacter;
