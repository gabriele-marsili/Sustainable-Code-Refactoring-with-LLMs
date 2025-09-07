export class Anagram {
  private readonly _input: string;
  private readonly _sortedInput: string;

  constructor(input: string) {
    this._input = input.toLowerCase();
    this._sortedInput = this.sortString(this._input);
  }

  public matches(...potentials: string[]): string[] {
    return potentials.filter(
      (p) => this.isAnagram(p.toLowerCase()) && p.toLowerCase() !== this._input
    );
  }

  private sortString(str: string): string {
    return str.split('').sort().join('');
  }

  private isAnagram(potential: string): boolean {
    return this.sortString(potential) === this._sortedInput;
  }
}