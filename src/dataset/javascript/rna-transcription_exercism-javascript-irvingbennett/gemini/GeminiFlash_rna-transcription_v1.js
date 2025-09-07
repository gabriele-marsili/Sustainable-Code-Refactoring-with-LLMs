export const toRna = (dna) => {
  const complement = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U",
  };

  let rna = "";
  for (let i = 0; i < dna.length; i++) {
    const nucleotide = dna[i];
    const rnaNucleotide = complement[nucleotide];
    if (rnaNucleotide === undefined) {
      throw new Error('Invalid input DNA.');
    }
    rna += rnaNucleotide;
  }
  return rna;
};