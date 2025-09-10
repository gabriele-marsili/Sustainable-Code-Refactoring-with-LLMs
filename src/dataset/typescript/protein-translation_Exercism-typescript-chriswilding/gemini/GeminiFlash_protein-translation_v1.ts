const AMINO_ACIDS: { [key: string]: string } = {
  "AUG": "Methionine",
  "UUU": "Phenylalanine",
  "UUC": "Phenylalanine",
  "UUA": "Leucine",
  "UUG": "Leucine",
  "UCU": "Serine",
  "UCC": "Serine",
  "UCA": "Serine",
  "UCG": "Serine",
  "UAU": "Tyrosine",
  "UAC": "Tyrosine",
  "UGU": "Cysteine",
  "UGC": "Cysteine",
  "UGG": "Tryptophan",
};

const STOP: Set<string> = new Set(["UAA", "UAG", "UGA"]);

class ProteinTranslation {
  static proteins(input: string): string[] {
    const output: string[] = [];
    const inputLength: number = input.length;

    for (let i = 0; i < inputLength; i += 3) {
      const codon: string = input.substring(i, i + 3);

      if (STOP.has(codon)) {
        return output;
      }

      const aminoAcid: string | undefined = AMINO_ACIDS[codon];
      if (aminoAcid) {
        output.push(aminoAcid);
      }
    }

    return output;
  }
}

export default ProteinTranslation