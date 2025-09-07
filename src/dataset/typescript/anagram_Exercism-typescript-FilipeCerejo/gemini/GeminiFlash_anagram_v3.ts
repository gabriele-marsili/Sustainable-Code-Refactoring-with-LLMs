export class Anagram {
  private readonly _inputLower: string;
  private readonly _sortedInput: string;

  constructor(input: string) {
    this._inputLower = input.toLowerCase();
    this._sortedInput = [...this._inputLower].sort().join('');
  }

  public matches(...potentials: string[]): string[] {
    const anagrams: string[] = [];

    for (const potential of potentials) {
      const potentialLower = potential.toLowerCase();

      if (potentialLower === this._inputLower) {
        continue;
      }

      if (potentialLower.length !== this._inputLower.length) {
        continue;
      }

      const sortedPotential = [...potentialLower].sort().join('');

      if (sortedPotential === this._sortedInput) {
        anagrams.push(potential);
      }
    }

    return anagrams;
  }
}