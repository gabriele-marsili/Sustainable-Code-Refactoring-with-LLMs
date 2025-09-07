export class DnDCharacter {
  hitpoints: number;

  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

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

  private static rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  public static generateAbilityScore(): number {
    const rolls = [this.rollDice(), this.rollDice(), this.rollDice(), this.rollDice()];
    return rolls
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, cur) => acc + cur, 0);
  }

  private static generateAllAbilityScores(): number[] {
    return Array.from({ length: 6 }, () => this.generateAbilityScore());
  }

  public static getModifierFor(abilityValue: number): number {
    return (abilityValue - 10) >> 1;
  }
}