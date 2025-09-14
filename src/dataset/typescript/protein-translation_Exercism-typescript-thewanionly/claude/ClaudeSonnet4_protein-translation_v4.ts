const CodonToProtein: { [key: string]: string } = {
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
type Protein<T> = T[keyof T]

export function translate(rnaSequence: string): Protein<typeof CodonToProtein>[] {
  const proteins: Protein<typeof CodonToProtein>[] = []
  const length = rnaSequence.length
  
  for (let i = 0; i < length; i += 3) {
    const codon = rnaSequence.slice(i, i + 3)
    const protein = CodonToProtein[codon]
    
    if (protein === 'STOP') break
    if (protein) proteins.push(protein)
  }

  return proteins
}