export const toRna = (dna = "") => {
  const dna_rna_complement = {
    G: "C",
    C: "G",
    T: "A",
    A: "U",
  };

  let rna_strands = "";
  for (let i = 0; i < dna.length; i++) {
    rna_strands += dna_rna_complement[dna[i]];
  }
  return rna_strands;
};