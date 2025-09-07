export const toRna = (data = "") => {
  const dna_rna_complement = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };

  let rna_strands = "";
  for (let i = 0; i < data.length; i++) {
    rna_strands += dna_rna_complement[data[i]];
  }
  return rna_strands;
};