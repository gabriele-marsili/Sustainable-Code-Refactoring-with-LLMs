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
    const proteins: string[] = [];
    const length = codonString.length;
    
    for (let i = 0; i < length; i += 3) {
      const codon = codonString.substr(i, 3);
      if (codon.length < 3) break;
      
      const protein = this.codonProteinMap[codon];
      if (protein === 'STOP') {
        break;
      }
      proteins.push(protein);
    }
    
    return proteins;
  }
}

export default ProteinTranslation;