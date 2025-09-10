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
  private _allergenScore: number;

  constructor(allergenScore: number) {
    this._allergenScore = allergenScore;
  }

  public list(): string[] {
    const result: string[] = [];
    for (let i = 0; i < ALLERGENS.length; i++) {
      if ((this._allergenScore >> i) & 1) {
        result.push(ALLERGENS[i]);
      }
    }
    return result;
  }

  public allergicTo(allergen: string): boolean {
    const allergenIndex = ALLERGENS.indexOf(allergen);
    if (allergenIndex === -1) {
      return false;
    }
    return ((this._allergenScore >> allergenIndex) & 1) === 1;
  }
}