"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
const INITIAL_HITPOINTS = 10;
const DICE_THROWS = 4;
const DICE_SIDES = 6;
const rollDice = () => {
    return Math.floor(DICE_SIDES * Math.random()) + 1;
};
const getAbilityFromThrows = (numbers) => {
    let min = numbers[0];
    let max = numbers[0];
    let sum = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        const num = numbers[i];
        sum += num;
        if (num < min)
            min = num;
        if (num > max)
            max = num;
    }
    return sum - min - max;
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
        const throws = [rollDice(), rollDice(), rollDice(), rollDice()];
        return getAbilityFromThrows(throws);
    }
    static getModifierFor(abilityValue) {
        return Math.floor((abilityValue - INITIAL_HITPOINTS) / 2);
    }
}
exports.DnDCharacter = DnDCharacter;
