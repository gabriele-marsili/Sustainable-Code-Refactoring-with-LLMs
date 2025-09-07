export class Anagram {
  private _input: string;
  private _sortedInput: string;

  constructor(input: string) {
    this._input = input.toLowerCase();
    this._sortedInput = [...this._input].sort().join('');
  }

  public matches(...potentials: string[]): string[] {
    const anagrams: string[] = [];
    for (const p of potentials) {
      const lowerP = p.toLowerCase();
      if (lowerP === this._input) continue;

      if (lowerP.length !== this._input.length) continue;

      const sortedP = [...lowerP].sort().join('');

      if (sortedP === this._sortedInput) {
        anagrams.push(p);
      }
    }
    return anagrams;
  }
}