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
    this._list = [];
    this.calculate();
  }

  private calculate(): void {
    let bit = this._allergen.toString(2);
    this._list = [];
    for (let b = bit.length - 1; b >= 0; b--) {
      if (bit[b] === '1' && ALLERGENS[bit.length - 1 - b]) this._list.push(ALLERGENS[bit.length - 1 - b]);
    }
  }

  public list(): string[] {
    return this._list;
  }

  public allergicTo(allergen: string): boolean {
    return this._list.some((a) => a === allergen);
  }
}
