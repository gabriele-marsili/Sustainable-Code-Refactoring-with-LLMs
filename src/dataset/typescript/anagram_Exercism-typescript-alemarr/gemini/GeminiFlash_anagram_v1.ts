export class Anagram {
  private readonly lowerCaseWord: string;
  private readonly sortedWord: string;

  constructor(private word: string) {
    this.lowerCaseWord = word.toLowerCase();
    this.sortedWord = this.lowerCaseWord.split('').sort().join('');
  }

  matches(...potentials: string[]): string[] {
    const output: string[] = [];

    for (const potential of potentials) {
      const lowerCasePotential = potential.toLowerCase();

      if (lowerCasePotential === this.lowerCaseWord) {
        continue;
      }

      if (lowerCasePotential.length !== this.word.length) {
          continue;
      }

      const sortedPotential = lowerCasePotential.split('').sort().join('');

      if (sortedPotential === this.sortedWord) {
        output.push(potential);
      }
    }

    return output;
  }
}