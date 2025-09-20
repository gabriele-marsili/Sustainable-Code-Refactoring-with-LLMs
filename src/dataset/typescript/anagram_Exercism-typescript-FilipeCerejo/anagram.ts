export class Anagram {
  private readonly _input: string;
  private readonly _sortedInput: string;

  constructor(input: string) {
    this._input = input.toLowerCase();
    this._sortedInput = this.sortString(this._input);
  }

  public matches(...potentials: string[]): string[] {
    return potentials.filter((p) => {
      const lowerP = p.toLowerCase();
      return lowerP !== this._input && this.sortString(lowerP) === this._sortedInput;
    });
  }

  private sortString(str: string): string {
    return str.split('').sort().join('');
  }
}