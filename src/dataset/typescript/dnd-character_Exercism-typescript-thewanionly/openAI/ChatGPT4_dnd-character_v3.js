"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
class DnDCharacter {
    constructor() {
        const scores = Array.from({ length: 6 }, () => DnDCharacter.generateAbilityScore());
        [this.strength, this.dexterity, this.constitution, this.intelligence, this.wisdom, this.charisma] = scores;
        this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
    }
    static generateAbilityScore() {
        const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
        return rolls.reduce((acc, curr) => acc + curr, 0) - Math.min(...rolls);
    }
    static getModifierFor(abilityValue) {
        return (abilityValue - 10) >> 1;
    }
}
exports.DnDCharacter = DnDCharacter;
