export class Anagram {
  private readonly normalizedWord: string;
  private readonly sortedWord: string;

  constructor(private word: string) {
    this.normalizedWord = word.toLowerCase();
    this.sortedWord = this.normalizedWord.split('').sort().join('');
  }

  matches(...potentials: string[]): string[] {
    const result: string[] = [];
    
    for (const potential of potentials) {
      const normalizedPotential = potential.toLowerCase();
      
      if (normalizedPotential === this.normalizedWord) {
        continue;
      }
      
      if (normalizedPotential.length !== this.normalizedWord.length) {
        continue;
      }
      
      const sortedPotential = normalizedPotential.split('').sort().join('');
      
      if (sortedPotential === this.sortedWord) {
        result.push(potential);
      }
    }
    
    return result;
  }
}