export class DnDCharacter {
  hitpoints = 0
  strength = 0
  dexterity = 0
  constitution = 0
  intelligence = 0
  wisdom = 0
  charisma = 0

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore()
    this.dexterity = DnDCharacter.generateAbilityScore()
    this.constitution = DnDCharacter.generateAbilityScore()
    this.intelligence = DnDCharacter.generateAbilityScore()
    this.wisdom = DnDCharacter.generateAbilityScore()
    this.charisma = DnDCharacter.generateAbilityScore()

    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution)
  }

  public static generateAbilityScore(): number {
    let min = 7
    let sum = 0
    
    for (let i = 0; i < 4; i++) {
      const roll = Math.floor(Math.random() * 6) + 1
      if (roll < min) {
        sum += min
        min = roll
      } else {
        sum += roll
      }
    }
    
    return sum
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2)
  }
}