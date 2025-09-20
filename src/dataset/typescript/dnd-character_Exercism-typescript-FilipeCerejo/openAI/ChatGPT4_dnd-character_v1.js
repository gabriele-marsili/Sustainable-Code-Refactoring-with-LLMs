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
    static generateAllAbilityScores() {
        return Array.from({ length: 6 }, () => DnDCharacter.generateAbilityScore());
    }
    static generateAbilityScore() {
        const rolls = [Math.random(), Math.random(), Math.random(), Math.random()]
            .map(r => Math.floor(r * 6) + 1);
        let min = rolls[0];
        let sum = rolls[0];
        for (let i = 1; i < 4; i++) {
            sum += rolls[i];
            if (rolls[i] < min)
                min = rolls[i];
        }
        return sum - min;
    }
    static getModifierFor(abilityValue) {
        return (abilityValue - 10) >> 1;
    }
}
exports.DnDCharacter = DnDCharacter;
