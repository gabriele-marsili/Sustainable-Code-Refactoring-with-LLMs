"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
class DnDCharacter {
    constructor() {
        this.strength = DnDCharacter.generateAbilityScore();
        this.dexterity = DnDCharacter.generateAbilityScore();
        this.constitution = DnDCharacter.generateAbilityScore();
        this.intelligence = DnDCharacter.generateAbilityScore();
        this.wisdom = DnDCharacter.generateAbilityScore();
        this.charisma = DnDCharacter.generateAbilityScore();
        this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
    }
    static generateAbilityScore() {
        return [0, 0, 0, 0]
            .map(() => (Math.floor(Math.random() * 6) + 1))
            .sort((a, b) => a < b ? a : b)
            .slice(1)
            .reduce((acc, cur) => acc += cur, 0);
    }
    static getModifierFor(abilityValue) {
        return Math.floor((abilityValue - 10) / 2);
    }
}
exports.DnDCharacter = DnDCharacter;
