class Transcriptor {
  private static readonly COMPLEMENTS = new Map([
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U']
  ]);

  toRna(dna: string): string {
    let result = '';
    for (let i = 0; i < dna.length; i++) {
      const complement = Transcriptor.COMPLEMENTS.get(dna[i]);
      if (complement === undefined) {
        throw 'Invalid input DNA.';
      }
      result += complement;
    }
    return result;
  }
}

export default Transcriptor;