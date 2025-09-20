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
        let min = 7;
        let sum = 0;
        for (let i = 0; i < 4; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            sum += roll;
            if (roll < min) {
                min = roll;
            }
        }
        return sum - min;
    }
    static getModifierFor(abilityValue) {
        return (abilityValue - 10) >> 1;
    }
}
exports.DnDCharacter = DnDCharacter;
