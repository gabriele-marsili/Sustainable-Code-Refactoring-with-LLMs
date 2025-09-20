"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
const INITIAL_HITPOINTS = 10;
const DICE_THROWS = 4;
const DICE_SIDES = 6;
const rollDice = () => Math.floor(DICE_SIDES * Math.random()) + 1;
const getAbilityFromThrows = (numbers) => {
    let min = Infinity, sum = 0;
    for (const num of numbers) {
        sum += num;
        if (num < min)
            min = num;
    }
    return sum - min;
};
class DnDCharacter {
    constructor() {
        this._constitution = DnDCharacter.generateAbilityScore();
        this._strength = DnDCharacter.generateAbilityScore();
        this._dexterity = DnDCharacter.generateAbilityScore();
        this._intelligence = DnDCharacter.generateAbilityScore();
        this._wisdom = DnDCharacter.generateAbilityScore();
        this._charisma = DnDCharacter.generateAbilityScore();
        this._hitpoints = INITIAL_HITPOINTS + DnDCharacter.getModifierFor(this._constitution);
    }
    get hitpoints() {
        return this._hitpoints;
    }
    get strength() {
        return this._strength;
    }
    get dexterity() {
        return this._dexterity;
    }
    get constitution() {
        return this._constitution;
    }
    get intelligence() {
        return this._intelligence;
    }
    get wisdom() {
        return this._wisdom;
    }
    get charisma() {
        return this._charisma;
    }
    static generateAbilityScore() {
        const throws = Array.from({ length: DICE_THROWS }, rollDice);
        return getAbilityFromThrows(throws);
    }
    static getModifierFor(abilityValue) {
        return (abilityValue - INITIAL_HITPOINTS) >> 1;
    }
}
exports.DnDCharacter = DnDCharacter;
