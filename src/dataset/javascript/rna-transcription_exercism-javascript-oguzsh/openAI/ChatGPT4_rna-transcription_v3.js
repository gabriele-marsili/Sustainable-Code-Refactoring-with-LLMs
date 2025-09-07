export const toRna = (data = "") => {
  const dnaRnaComplement = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };

  return [...data].map(nucleotide => dnaRnaComplement[nucleotide]).join('');
};