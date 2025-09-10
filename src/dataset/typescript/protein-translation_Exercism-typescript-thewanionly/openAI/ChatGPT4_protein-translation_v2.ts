const CodonToProtein: Readonly<Record<string, string>> = {
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
  for (let i = 0; i < rnaSequence.length; i += 3) {
    const codon = rnaSequence.slice(i, i + 3) as Codon;
    const protein = CodonToProtein[codon];
    if (!protein || protein === 'STOP') break;
    proteins.push(protein);
  }
  return proteins;
}