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
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    return rolls.reduce((acc, curr) => acc + curr, 0) - Math.min(...rolls);
  }

  public static getModifierFor(abilityValue: number): number {
    return (abilityValue - 10) >> 1;
  }
}