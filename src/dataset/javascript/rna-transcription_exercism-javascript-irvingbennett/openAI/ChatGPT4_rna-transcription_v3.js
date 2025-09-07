export const toRna = (dna) => {
  const complement = {
    G: "C",
    C: "G",
    T: "A",
    A: "U",
  };
  return [...dna].map(nucleotide => complement[nucleotide]).join('');
};