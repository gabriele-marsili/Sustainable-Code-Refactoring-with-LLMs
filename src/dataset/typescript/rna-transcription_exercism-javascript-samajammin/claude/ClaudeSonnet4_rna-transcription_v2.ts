class Transcriptor {
  private static readonly complements: Record<string, string> = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  };

  toRna(dna: string): string {
    let result = '';
    for (let i = 0; i < dna.length; i++) {
      const complement = Transcriptor.complements[dna[i]];
      if (!complement) {
        throw 'Invalid input DNA.';
      }
      result += complement;
    }
    return result;
  }
}

export default Transcriptor;