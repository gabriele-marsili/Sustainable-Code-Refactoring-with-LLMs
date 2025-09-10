class ProteinTranslation {
  static readonly codonProteinMap = new Map<string, string>([
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
    ['UGC', 'Cysteine'],
    ['UGU', 'Cysteine'],
    ['UGG', 'Tryptophan'],
    ['UAA', 'STOP'],
    ['UAG', 'STOP'],
    ['UGA', 'STOP']
  ]);

  static proteins(codonString: string): string[] {
    const proteins: string[] = [];
    for (let i = 0; i < codonString.length; i += 3) {
      const codon = codonString.slice(i, i + 3);
      const protein = this.codonProteinMap.get(codon);
      if (!protein || protein === 'STOP') break;
      proteins.push(protein);
    }
    return proteins;
  }
}

export default ProteinTranslation;