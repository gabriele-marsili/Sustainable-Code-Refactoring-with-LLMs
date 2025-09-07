export class DnDCharacter {
  hitpoints: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore();
    this.dexterity = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    this.wisdom = DnDCharacter.generateAbilityScore();
    this.charisma = DnDCharacter.generateAbilityScore();

    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }

  public static generateAbilityScore(): number {
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

  public static getModifierFor(abilityValue: number): number {
    return (abilityValue - 10) >> 1;
  }
}