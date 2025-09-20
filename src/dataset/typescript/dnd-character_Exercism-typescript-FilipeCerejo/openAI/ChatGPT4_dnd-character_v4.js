"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
class DnDCharacter {
    constructor() {
        const scores = DnDCharacter.generateAllAbilityScores();
        this.strength = scores[0];
        this.dexterity = scores[1];
        this.constitution = scores[2];
        this.intelligence = scores[3];
        this.wisdom = scores[4];
        this.charisma = scores[5];
        this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
    }
    static rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }
    static generateAbilityScore() {
        const rolls = [this.rollDice(), this.rollDice(), this.rollDice(), this.rollDice()];
        return rolls
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((acc, cur) => acc + cur, 0);
    }
    static generateAllAbilityScores() {
        return Array.from({ length: 6 }, () => this.generateAbilityScore());
    }
    static getModifierFor(abilityValue) {
        return (abilityValue - 10) >> 1;
    }
}
exports.DnDCharacter = DnDCharacter;
