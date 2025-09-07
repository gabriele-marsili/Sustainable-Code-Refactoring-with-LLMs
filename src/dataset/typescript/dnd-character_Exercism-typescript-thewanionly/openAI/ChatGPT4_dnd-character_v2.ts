export class DnDCharacter {
  hitpoints: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  constructor() {
    const abilityScores = DnDCharacter.generateAllAbilityScores();
    this.strength = abilityScores[0];
    this.dexterity = abilityScores[1];
    this.constitution = abilityScores[2];
    this.intelligence = abilityScores[3];
    this.wisdom = abilityScores[4];
    this.charisma = abilityScores[5];

    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  private static generateAllAbilityScores(): number[] {
    return Array.from({ length: 6 }, () => DnDCharacter.generateAbilityScore());
  }

  public static generateAbilityScore(): number {
    const rolls = [0, 0, 0, 0].map(() => Math.floor(Math.random() * 6) + 1);
    const minRoll = Math.min(...rolls);
    return rolls.reduce((acc, curr) => acc + curr, 0) - minRoll;
  }

  public static getModifierFor(abilityValue: number): number {
    return (abilityValue - 10) >> 1; // Bitwise shift for faster division by 2
  }
}