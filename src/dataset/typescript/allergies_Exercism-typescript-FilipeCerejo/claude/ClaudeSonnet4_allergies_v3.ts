const ALLERGENS = [
  'eggs',
  'peanuts',
  'shellfish',
  'strawberries',
  'tomatoes',
  'chocolate',
  'pollen',
  'cats',
];

export class Allergies {
  private _allergen: number;

  constructor(allergenIndex: number) {
    this._allergen = allergenIndex & 0xFF;
  }

  public list(): string[] {
    const result: string[] = [];
    let allergenValue = this._allergen;
    let index = 0;
    
    while (allergenValue > 0 && index < ALLERGENS.length) {
      if (allergenValue & 1) {
        result.push(ALLERGENS[index]);
      }
      allergenValue >>>= 1;
      index++;
    }
    
    return result;
  }

  public allergicTo(allergen: string): boolean {
    const index = ALLERGENS.indexOf(allergen);
    return index !== -1 && (this._allergen & (1 << index)) !== 0;
  }
}