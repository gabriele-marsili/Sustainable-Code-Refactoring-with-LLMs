export function translate(rna: string) {
  const codonMap: Record<string, string | null> = {
    AUG: 'Methionine',
    UUU: 'Phenylalanine', UUC: 'Phenylalanine',
    UUA: 'Leucine', UUG: 'Leucine',
    UCU: 'Serine', UCC: 'Serine', UCA: 'Serine', UCG: 'Serine',
    UAU: 'Tyrosine', UAC: 'Tyrosine',
    UGU: 'Cysteine', UGC: 'Cysteine',
    UGG: 'Tryptophan',
    UAA: null, UAG: null, UGA: null
  };

  const protein: string[] = [];
  for (let w = 0; w < rna.length; w += 3) {
    const codon = rna.slice(w, w + 3);
    const aminoAcid = codonMap[codon];
    if (aminoAcid === null) break;
    if (aminoAcid) protein.push(aminoAcid);
  }
  return protein;
}