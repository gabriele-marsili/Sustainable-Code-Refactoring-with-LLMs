class DnaTranscriber {
  constructor() {
    this.dnaToRna = { G: 'C', C: 'G', T: 'A', A: 'U' };
  }

  toRna(dna) {
    return [...dna].map(e => this.dnaToRna[e] || '').join('');
  }
}

export default DnaTranscriber;