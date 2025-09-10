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
  private _list: string[];

  constructor(allergenIndex: number) {
    this._allergen = allergenIndex;
    this._list = this.calculate();
  }

  private calculate(): string[] {
    const result: string[] = [];
    for (let i = 0; i < ALLERGENS.length; i++) {
      if (this._allergen & (1 << i)) {
        result.push(ALLERGENS[i]);
      }
    }
    return result;
  }

  public list(): string[] {
    return this._list;
  }

  public allergicTo(allergen: string): boolean {
    return this._list.includes(allergen);
  }
}