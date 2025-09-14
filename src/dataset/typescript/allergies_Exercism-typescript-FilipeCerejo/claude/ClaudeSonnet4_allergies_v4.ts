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
    this._allergen = allergenIndex & 0xFF;
    this._list = this.calculate();
  }

  private calculate(): string[] {
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

  public list(): string[] {
    return this._list;
  }

  public allergicTo(allergen: string): boolean {
    const allergenIndex = ALLERGENS.indexOf(allergen);
    return allergenIndex !== -1 && (this._allergen & (1 << allergenIndex)) !== 0;
  }
}