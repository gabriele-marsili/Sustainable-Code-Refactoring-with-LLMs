export class Anagram {
  private readonly sortedWord: string;
  private readonly lowerCaseWord: string;

  constructor(private word: string) {
    this.lowerCaseWord = word.toLowerCase();
    this.sortedWord = this.lowerCaseWord.split('').sort().join('');
  }

  matches(...potentials: string[]): string[] {
    const output: string[] = [];

    for (const word of potentials) {
      const lowerCasePotential = word.toLowerCase();

      if (lowerCasePotential === this.lowerCaseWord) {
        continue;
      }

      if (lowerCasePotential.length !== this.word.length) {
        continue;
      }

      const sortedPotential = lowerCasePotential.split('').sort().join('');

      if (sortedPotential === this.sortedWord) {
        output.push(word);
      }
    }

    return output;
  }
}