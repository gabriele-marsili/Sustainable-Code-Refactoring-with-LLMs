const translationMap = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (string) => {
  let rna = "";
  for (let i = 0; i < string.length; i++) {
    const nucleotide = string[i];
    const rnaNucleotide = translationMap[nucleotide];
    if (rnaNucleotide) {
      rna += rnaNucleotide;
    } else {
      throw new Error('Invalid input DNA.');
    }
  }
  return rna;
};