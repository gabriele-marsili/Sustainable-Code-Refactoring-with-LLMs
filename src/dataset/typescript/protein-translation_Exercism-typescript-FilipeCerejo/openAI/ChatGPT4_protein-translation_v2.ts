export function translate(rna: string): string[] {
  const codonMap: { [key: string]: string | null } = {
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
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    const aminoAcid = codonMap[codon];
    if (aminoAcid === null) break;
    if (aminoAcid) protein.push(aminoAcid);
  }
  return protein;
}