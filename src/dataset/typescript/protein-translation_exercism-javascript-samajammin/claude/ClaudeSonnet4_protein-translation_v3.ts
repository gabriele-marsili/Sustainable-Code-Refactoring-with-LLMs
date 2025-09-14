class ProteinTranslation {
  private static readonly codonProteinMap = new Map([
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
      if (codon.length < 3) break;
      
      const protein = this.codonProteinMap.get(codon);
      if (protein === 'STOP') break;
      if (protein) proteins.push(protein);
    }
    
    return proteins;
  }
}

export default ProteinTranslation;