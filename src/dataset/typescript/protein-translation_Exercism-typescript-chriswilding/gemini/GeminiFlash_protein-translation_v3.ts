const AMINO_ACIDS = new Map<string, string>([
  ["AUG", "Methionine"],
  ["UUU", "Phenylalanine"],
  ["UUC", "Phenylalanine"],
  ["UUA", "Leucine"],
  ["UUG", "Leucine"],
  ["UCU", "Serine"],
  ["UCC", "Serine"],
  ["UCA", "Serine"],
  ["UCG", "Serine"],
  ["UAU", "Tyrosine"],
  ["UAC", "Tyrosine"],
  ["UGU", "Cysteine"],
  ["UGC", "Cysteine"],
  ["UGG", "Tryptophan"],
]);

const STOP = new Set(["UAA", "UAG", "UGA"]);

class ProteinTranslation {
  static proteins(input: string): string[] {
    const output: string[] = [];
    const inputLength = input.length;

    for (let i = 0; i < inputLength; i += 3) {
      const codon = input.substring(i, i + 3);

      if (STOP.has(codon)) {
        return output;
      }

      const aminoAcid = AMINO_ACIDS.get(codon);
      if (aminoAcid) {
        output.push(aminoAcid);
      } else {
        break;
      }
    }

    return output;
  }
}

export default ProteinTranslation;