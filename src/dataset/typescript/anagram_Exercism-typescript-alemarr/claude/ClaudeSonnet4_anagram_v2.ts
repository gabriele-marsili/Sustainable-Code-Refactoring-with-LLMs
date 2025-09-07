export class Anagram {
  private sortedWord: string;
  private lowerWord: string;

  constructor(private word: string) {
    this.lowerWord = word.toLowerCase();
    this.sortedWord = this.lowerWord.split('').sort().join('');
  }

  matches(...potentials: string[]): string[] {
    const output: string[] = [];

    for (const potential of potentials) {
      const lowerPotential = potential.toLowerCase();
      
      if (lowerPotential === this.lowerWord) {
        continue;
      }

      if (potential.length !== this.word.length) {
        continue;
      }

      const sortedPotential = lowerPotential.split('').sort().join('');
      
      if (sortedPotential === this.sortedWord) {
        output.push(potential);
      }
    }

    return output;
  }
}