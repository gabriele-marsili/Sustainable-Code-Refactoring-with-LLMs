"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DnDCharacter = void 0;
const INITIAL_HITPOINTS = 10;
const DICE_THROWS = 4;
const DICE_SIDES = 6;
const rollDice = () => Math.floor(DICE_SIDES * Math.random()) + 1;
const getAbilityFromThrows = (numbers) => {
    let min = Infinity;
    let sum = 0;
    for (const num of numbers) {
        sum += num;
        if (num < min)
            min = num;
    }
    return sum - min;
};
class DnDCharacter {
    constructor() {
        const abilities = DnDCharacter.generateAllAbilityScores();
        this._constitution = abilities[0];
        this._strength = abilities[1];
        this._dexterity = abilities[2];
        this._intelligence = abilities[3];
        this._wisdom = abilities[4];
        this._charisma = abilities[5];
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
    static generateAllAbilityScores() {
        return Array.from({ length: 6 }, DnDCharacter.generateAbilityScore);
    }
    static getModifierFor(abilityValue) {
        return (abilityValue - INITIAL_HITPOINTS) >> 1; // Faster bitwise division by 2
    }
}
exports.DnDCharacter = DnDCharacter;
