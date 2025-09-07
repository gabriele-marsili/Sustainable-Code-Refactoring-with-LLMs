class Transcriptor {
  private static readonly complements: Record<string, string> = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  };

  toRna(dna: string): string {
    let rna = '';
    for (const char of dna) {
      const complement = Transcriptor.complements[char];
      if (!complement) {
        throw new Error('Invalid input DNA.');
      }
      rna += complement;
    }
    return rna;
  }
}

export default Transcriptor;