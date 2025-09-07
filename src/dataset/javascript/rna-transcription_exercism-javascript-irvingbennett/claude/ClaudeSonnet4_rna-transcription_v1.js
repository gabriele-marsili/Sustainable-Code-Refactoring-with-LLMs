export const toRna = (dna) => {
  const complement = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U",
  };
  
  const result = [];
  for (let i = 0; i < dna.length; i++) {
    result.push(complement[dna[i]]);
  }
  return result.join('');
};