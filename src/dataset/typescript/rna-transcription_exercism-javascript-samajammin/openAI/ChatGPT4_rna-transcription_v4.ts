class Transcriptor {
  private static readonly complements = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  } as const;

  toRna(dna: string): string {
    let rna = '';
    for (let i = 0; i < dna.length; i++) {
      const complement = Transcriptor.complements[dna[i] as keyof typeof Transcriptor.complements];
      if (!complement) throw 'Invalid input DNA.';
      rna += complement;
    }
    return rna;
  }
}

export default Transcriptor;