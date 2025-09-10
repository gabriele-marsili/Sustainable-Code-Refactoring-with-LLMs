const CodonToProtein = {
  AUG: 'Methionine',
  UUU: 'Phenylalanine',
  UUC: 'Phenylalanine',
  UUA: 'Leucine',
  UUG: 'Leucine',
  UCU: 'Serine',
  UCC: 'Serine',
  UCA: 'Serine',
  UCG: 'Serine',
  UAU: 'Tyrosine',
  UAC: 'Tyrosine',
  UGU: 'Cysteine',
  UGC: 'Cysteine',
  UGG: 'Tryptophan',
  UAA: 'STOP',
  UAG: 'STOP',
  UGA: 'STOP'
} as const

type Codon = keyof typeof CodonToProtein
type Protein = typeof CodonToProtein[Codon]

export function translate(rnaSequence: string): Protein[] {
  const proteins: Protein[] = [];
  if (!rnaSequence) return proteins;

  const codons = rnaSequence.match(/.{1,3}/g);

  if (!codons) return proteins;

  for (const codon of codons) {
    const protein = CodonToProtein[codon as Codon];
    if (protein === 'STOP') break;
    proteins.push(protein);
  }

  return proteins;
}