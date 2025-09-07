class Transcriptor {
  private static readonly complements: { [dna: string]: string } = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  };

  toRna(dna: string): string {
    let rna = "";
    for (let i = 0; i < dna.length; i++) {
      const char = dna[i];
      const complement = Transcriptor.complements[char];
      if (!complement) {
        throw 'Invalid input DNA.';
      }
      rna += complement;
    }
    return rna;
  }
}

export default Transcriptor;