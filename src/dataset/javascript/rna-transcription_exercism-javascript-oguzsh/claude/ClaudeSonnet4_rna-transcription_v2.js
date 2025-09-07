export const toRna = (data = "") => {
  const dna_rna_complement = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };

  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += dna_rna_complement[data[i]];
  }
  return result;
};