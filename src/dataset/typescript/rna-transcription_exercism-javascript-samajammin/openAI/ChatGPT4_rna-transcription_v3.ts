class Transcriptor {
  private static readonly complements = new Map<string, string>([
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U']
  ]);

  toRna(dna: string): string {
    let rna = '';
    for (const char of dna) {
      const complement = Transcriptor.complements.get(char);
      if (!complement) {
        throw 'Invalid input DNA.';
      }
      rna += complement;
    }
    return rna;
  }
}

export default Transcriptor;