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
} as const;

type Codon = keyof typeof CodonToProtein;
type Protein = typeof CodonToProtein[Codon];

export function translate(rnaSequence: string): Protein[] {
  const proteins: Protein[] = [];
  if (!rnaSequence) return proteins;

  for (let i = 0; i < rnaSequence.length; i += 3) {
    const codon = rnaSequence.substring(i, i + 3) as Codon;
    const protein = CodonToProtein[codon];

    if (protein === 'STOP') break;

    if (protein) {
      proteins.push(protein);
    }
  }

  return proteins;
}