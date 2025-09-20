const DNA_TO_RNA = {
  G: "C",
  C: "G",
  T: "A",
  A: "U",
};

export const toRna = (dnaSequence) => {
  if (!dnaSequence) return "";

  let rnaSequence = "";
  for (let i = 0; i < dnaSequence.length; i++) {
    const char = dnaSequence[i];
    rnaSequence += DNA_TO_RNA[char];
  }
  return rnaSequence;
};