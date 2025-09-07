export function toRna(DNA) {
  const map = {
    A: 'U',
    C: 'G',
    G: 'C',
    T: 'A',
  };
  let rna = "";
  for (let i = 0; i < DNA.length; i++) {
    rna += map[DNA[i]];
  }
  return rna;
}