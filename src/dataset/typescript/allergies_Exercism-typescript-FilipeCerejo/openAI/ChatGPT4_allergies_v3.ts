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
    return ALLERGENS.filter((_, index) => (this._allergen & (1 << index)) !== 0);
  }

  public allergicTo(allergen: string): boolean {
    const index = ALLERGENS.indexOf(allergen);
    return index !== -1 && (this._allergen & (1 << index)) !== 0;
  }
}