export function translate(rna: string) {
  const codonMap = new Map([
    ['AUG', 'Methionine'],
    ['UUU', 'Phenylalanine'],
    ['UUC', 'Phenylalanine'],
    ['UUA', 'Leucine'],
    ['UUG', 'Leucine'],
    ['UCU', 'Serine'],
    ['UCC', 'Serine'],
    ['UCA', 'Serine'],
    ['UCG', 'Serine'],
    ['UAU', 'Tyrosine'],
    ['UAC', 'Tyrosine'],
    ['UGU', 'Cysteine'],
    ['UGC', 'Cysteine'],
    ['UGG', 'Tryptophan']
  ]);

  const stopCodons = new Set(['UAA', 'UAG', 'UGA']);
  const protein: string[] = [];

  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.slice(i, i + 3);
    
    if (stopCodons.has(codon)) {
      break;
    }
    
    const aminoAcid = codonMap.get(codon);
    if (aminoAcid) {
      protein.push(aminoAcid);
    } else {
      break;
    }
  }

  return protein;
}