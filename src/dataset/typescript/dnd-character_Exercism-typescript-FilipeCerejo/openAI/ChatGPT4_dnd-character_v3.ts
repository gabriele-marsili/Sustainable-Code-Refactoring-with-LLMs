export class DnDCharacter {
  hitpoints: number;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  constructor() {
    const scores = Array.from({ length: 6 }, () => DnDCharacter.generateAbilityScore());
    [this.strength, this.dexterity, this.constitution, this.intelligence, this.wisdom, this.charisma] = scores;
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  public static generateAbilityScore(): number {
    const rolls = [0, 0, 0, 0].map(() => Math.floor(Math.random() * 6) + 1);
    let min = rolls[0];
    let sum = rolls[0];
    for (let i = 1; i < rolls.length; i++) {
      sum += rolls[i];
      if (rolls[i] < min) min = rolls[i];
    }
    return sum - min;
  }

  public static getModifierFor(abilityValue: number): number {
    return (abilityValue - 10) >> 1;
  }
}