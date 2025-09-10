export function translate(rna: string) {
  const codonMap: { [key: string]: string } = {
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
    'UAA': 'STOP',
    'UAG': 'STOP',
    'UGA': 'STOP',
  };

  const protein: string[] = [];
  for (let i = 0; i < rna.length; i += 3) {
    const codon = rna.substring(i, i + 3);
    const aminoAcid = codonMap[codon];

    if (!aminoAcid) {
      return protein;
    }

    if (aminoAcid === 'STOP') {
      return protein;
    }

    protein.push(aminoAcid);
  }

  return protein;
}