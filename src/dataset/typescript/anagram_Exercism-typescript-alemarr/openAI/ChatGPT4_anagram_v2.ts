export class Anagram {
  private readonly sortedWord: string;
  private readonly lowerCaseWord: string;

  constructor(private word: string) {
    this.lowerCaseWord = word.toLowerCase();
    this.sortedWord = this.sortString(this.lowerCaseWord);
  }

  matches(...potentials: string[]): string[] {
    return potentials.filter(word => {
      const lowerCasePotential = word.toLowerCase();
      return (
        lowerCasePotential !== this.lowerCaseWord &&
        this.sortString(lowerCasePotential) === this.sortedWord
      );
    });
  }

  private sortString(str: string): string {
    return str.split('').sort().join('');
  }
}