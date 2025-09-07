export const toRna = (dna) => {
  const complement = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U",
  };
  
  let result = "";
  for (let i = 0; i < dna.length; i++) {
    result += complement[dna[i]];
  }
  return result;
};