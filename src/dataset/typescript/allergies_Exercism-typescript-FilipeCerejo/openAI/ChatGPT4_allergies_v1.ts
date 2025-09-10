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
    this._allergen = allergenIndex;
  }

  public list(): string[] {
    const allergens: string[] = [];
    for (let i = 0; i < ALLERGENS.length; i++) {
      if (this._allergen & (1 << i)) {
        allergens.push(ALLERGENS[i]);
      }
    }
    return allergens;
  }

  public allergicTo(allergen: string): boolean {
    const index = ALLERGENS.indexOf(allergen);
    return index !== -1 && !!(this._allergen & (1 << index));
  }
}