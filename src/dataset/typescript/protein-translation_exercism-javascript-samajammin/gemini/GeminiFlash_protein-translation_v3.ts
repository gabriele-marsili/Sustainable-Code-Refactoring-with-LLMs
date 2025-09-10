class ProteinTranslation {
  private static readonly codonProteinMap: Readonly<Record<string, string>> = {
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
    UGC: 'Cysteine',
    UGU: 'Cysteine',
    UGG: 'Tryptophan',
    UAA: 'STOP',
    UAG: 'STOP',
    UGA: 'STOP'
  };

  static proteins(codonString: string): string[] {
    const codons = codonString.match(/.{1,3}/g);
    if (!codons) {
      return [];
    }

    const proteins: string[] = [];
    for (const codon of codons) {
      const protein = this.codonProteinMap[codon];
      if (protein === 'STOP') {
        return proteins;
      }
      if (protein) {
        proteins.push(protein);
      }
    }
    return proteins;
  }
}

export default ProteinTranslation;