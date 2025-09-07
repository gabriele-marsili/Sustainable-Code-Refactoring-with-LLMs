const translationMap = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (dna) => {
  let rna = "";
  for (let i = 0; i < dna.length; i++) {
    const nucleotide = dna[i];
    const rnaNucleotide = translationMap[nucleotide];
    if (rnaNucleotide) {
      rna += rnaNucleotide;
    } else {
      throw new Error('Invalid input DNA.');
    }
  }
  return rna;
};