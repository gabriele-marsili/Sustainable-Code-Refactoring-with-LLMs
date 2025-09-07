const INITIAL_HITPOINTS = 10;
const DICE_THROWS = 4;
const DICE_SIDES = 6;

const rollDice = (): number => {
  return Math.floor(DICE_SIDES * Math.random()) + 1;
};

const getAbilityFromThrows = (numbers: number[]): number => {
  let min = numbers[0];
  let sum = 0;
  
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    sum += num;
    if (num < min) {
      min = num;
    }
  }
  
  return sum - min;
};

export class DnDCharacter {
  private _hitpoints: number;
  private _constitution: number;
  private _strength: number;
  private _dexterity: number;
  private _intelligence: number;
  private _wisdom: number;
  private _charisma: number;

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

  public static generateAbilityScore(): number {
    const throws = [rollDice(), rollDice(), rollDice(), rollDice()];
    return getAbilityFromThrows(throws);
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - INITIAL_HITPOINTS) / 2);
  }
}