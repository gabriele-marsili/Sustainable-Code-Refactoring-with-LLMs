export function translate(rna: string) {
  const codonMap: Record<string, string | null> = {
    'AUG': 'Methionine',
    'UUU': 'Phenylalanine',
    'UUC': 'Phenylalanine',
    'UUA': 'Leucine',
    'UUG': 'Leucine',
    'UCU': 'Serine',
    'UCC': 'Serine',
    'UCA': 'Serine',
    'UCG': 'Serine',
    'UAU': 'Tyrosine',
    'UAC': 'Tyrosine',
    'UGU': 'Cysteine',
    'UGC': 'Cysteine',
    'UGG': 'Tryptophan',
    'UAA': null,
    'UAG': null,
    'UGA': null
  };

  const protein: string[] = [];
  
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.substr(i, 3);
    const aminoAcid = codonMap[codon];
    
    if (aminoAcid === null || aminoAcid === undefined) {
      return protein;
    }
    
    protein.push(aminoAcid);
  }
  
  return protein;
}