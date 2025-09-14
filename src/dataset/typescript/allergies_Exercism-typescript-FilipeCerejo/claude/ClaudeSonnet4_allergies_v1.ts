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
    this._allergen = allergenIndex & 0xFF; // Mask to 8 bits only
  }

  public list(): string[] {
    const result: string[] = [];
    for (let i = 0; i < ALLERGENS.length; i++) {
      if (this._allergen & (1 << i)) {
        result.push(ALLERGENS[i]);
      }
    }
    return result;
  }

  public allergicTo(allergen: string): boolean {
    const index = ALLERGENS.indexOf(allergen);
    return index !== -1 && (this._allergen & (1 << index)) !== 0;
  }
}