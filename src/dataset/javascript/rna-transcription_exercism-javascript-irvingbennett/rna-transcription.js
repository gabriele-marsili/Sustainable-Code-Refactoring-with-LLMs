//
// This is only a SKELETON file for the 'RNA Transcription' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const toRna = (dna) => {
  let complement = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U",
  }
  console.log(dna)
  let rna = ""
  for (let i = 0; i < dna.length; i++) {
    rna = rna + complement[dna.charAt(i)]
  }
  return rna
};
