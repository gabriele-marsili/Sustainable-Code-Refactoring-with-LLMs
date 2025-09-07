export class Anagram {
  private readonly _input: string;
  private readonly _sortedInput: string;

  constructor(input: string) {
    this._input = input.toLowerCase();
    this._sortedInput = Anagram.sortString(this._input);
  }

  public matches(...potentials: string[]): string[] {
    return potentials.filter((p) => {
      const lowerP = p.toLowerCase();
      return lowerP !== this._input && Anagram.sortString(lowerP) === this._sortedInput;
    });
  }

  private static sortString(str: string): string {
    return str.split('').sort().join('');
  }
}