const codonToProtein = new Map<string, string>([
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
  ['UGG', 'Tryptophan'],
  ['UAA', 'STOP'],
  ['UAG', 'STOP'],
  ['UGA', 'STOP'],
]);

type Protein = string;

export function translate(rnaSequence: string): Protein[] {
  const proteins: Protein[] = [];
  if (!rnaSequence) {
    return proteins;
  }

  for (let i = 0; i < rnaSequence.length; i += 3) {
    const codon = rnaSequence.substring(i, i + 3);
    const protein = codonToProtein.get(codon);

    if (protein === 'STOP') {
      break;
    }

    if (protein) {
      proteins.push(protein);
    } else {
      break; // Or throw an error, depending on desired behavior for invalid codons
    }
  }

  return proteins;
}