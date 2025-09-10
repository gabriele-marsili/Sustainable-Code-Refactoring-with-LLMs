class ProteinTranslation {
  static readonly codonProteinMap: { [codon: string]: string } = {
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
    const codons: string[] = codonString.match(/.{1,3}/g) || [];
    const proteins: string[] = [];
    for (let i = 0; i < codons.length; i++) {
      const codon = codons[i];
      const protein = this.codonProteinMap[codon];
      if (protein === 'STOP') {
        return proteins;
      }
      proteins.push(protein);
    }
    return proteins;
  }
}

export default ProteinTranslation;