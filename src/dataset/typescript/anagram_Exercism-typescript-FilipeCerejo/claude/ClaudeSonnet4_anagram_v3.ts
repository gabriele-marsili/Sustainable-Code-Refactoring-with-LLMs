export class Anagram {
  private _input: string;
  private _sortedInput: string;

  constructor(input: string) {
    this._input = input.toLowerCase();
    this._sortedInput = [...this._input].sort().join('');
  }

  public matches(...potentials: string[]): string[] {
    const anagrams: string[] = [];
    
    for (const potential of potentials) {
      const lowerPotential = potential.toLowerCase();
      
      if (lowerPotential === this._input) continue;
      if (lowerPotential.length !== this._input.length) continue;
      
      const sortedPotential = [...lowerPotential].sort().join('');
      
      if (sortedPotential === this._sortedInput) {
        anagrams.push(potential);
      }
    }
    
    return anagrams;
  }
}