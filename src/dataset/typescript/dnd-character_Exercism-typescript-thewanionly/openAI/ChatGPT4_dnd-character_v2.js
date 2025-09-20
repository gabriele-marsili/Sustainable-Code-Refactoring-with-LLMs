"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
class DnDCharacter {
    constructor() {
        const abilityScores = DnDCharacter.generateAllAbilityScores();
        this.strength = abilityScores[0];
        this.dexterity = abilityScores[1];
        this.constitution = abilityScores[2];
        this.intelligence = abilityScores[3];
        this.wisdom = abilityScores[4];
        this.charisma = abilityScores[5];
        this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
    }
    static generateAllAbilityScores() {
        return Array.from({ length: 6 }, () => DnDCharacter.generateAbilityScore());
    }
    static generateAbilityScore() {
        const rolls = [0, 0, 0, 0].map(() => Math.floor(Math.random() * 6) + 1);
        const minRoll = Math.min(...rolls);
        return rolls.reduce((acc, curr) => acc + curr, 0) - minRoll;
    }
    static getModifierFor(abilityValue) {
        return (abilityValue - 10) >> 1; // Bitwise shift for faster division by 2
    }
}
exports.DnDCharacter = DnDCharacter;
