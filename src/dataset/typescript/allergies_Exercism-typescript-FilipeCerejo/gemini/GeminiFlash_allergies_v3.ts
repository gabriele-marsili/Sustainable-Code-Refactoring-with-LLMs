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

const ALLERGEN_SCORES = {
    'eggs': 1,
    'peanuts': 2,
    'shellfish': 4,
    'strawberries': 8,
    'tomatoes': 16,
    'chocolate': 32,
    'pollen': 64,
    'cats': 128,
};

export class Allergies {
  private _allergen: number;
  private _list: string[];

  constructor(allergenIndex: number) {
    this._allergen = allergenIndex;
    this._list = this.calculate();
  }

  private calculate(): string[] {
    const result: string[] = [];
    let remainingScore = this._allergen;

    for (let i = ALLERGENS.length - 1; i >= 0; i--) {
      const allergen = ALLERGENS[i];
      const allergenScore = 1 << i;

      if (remainingScore >= allergenScore) {
        result.unshift(allergen);
        remainingScore -= allergenScore;
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