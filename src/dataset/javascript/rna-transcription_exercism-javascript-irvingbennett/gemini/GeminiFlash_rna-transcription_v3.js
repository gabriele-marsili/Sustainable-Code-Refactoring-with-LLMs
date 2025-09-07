export const toRna = (dna) => {
  const complement = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U",
  };

  let rna = "";
  for (const nucleotide of dna) {
    const rnaNucleotide = complement[nucleotide];
    if (rnaNucleotide === undefined) {
      throw new Error('Invalid input DNA.');
    }
    rna += rnaNucleotide;
  }
  return rna;
};