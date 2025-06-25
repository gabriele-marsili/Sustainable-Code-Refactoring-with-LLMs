export class Anagram {
  private _input: string;

  constructor(input: string) {
    this._input = input.toLowerCase();
  }

  public matches(...potentials: string[]): string[] {
    let sortedInput = [...this._input].sort().join('');
    let anagrams: string[] = [];
    potentials.forEach((p) => {
      let sortedP = [...p.toLowerCase()].sort().join('');
      console.log('sortedInput', sortedInput, 'sortedP', sortedP);
      if (sortedP === sortedInput && p.toLowerCase() !== this._input) anagrams.push(p);
    });
    return anagrams;
  }
}
