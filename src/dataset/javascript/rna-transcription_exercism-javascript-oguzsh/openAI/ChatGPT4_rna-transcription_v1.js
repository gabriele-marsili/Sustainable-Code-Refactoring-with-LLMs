export const toRna = (data = "") => {
  const dnaRnaComplement = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };

  return Array.from(data, nucleotide => dnaRnaComplement[nucleotide] || "").join("");
};