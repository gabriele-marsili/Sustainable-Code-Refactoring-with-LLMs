const AMINO_ACIDS = new Map([
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
])

const STOP = new Set(["UAA", "UAG", "UGA"])

class ProteinTranslation {
  static proteins(input: string): string[] {
    const output = []

    for (let i = 0; i < input.length; i += 3) {
      const codon = input.substr(i, 3)

      if (STOP.has(codon)) {
        return output
      }

      const aminoAcid = AMINO_ACIDS.get(codon)
      if (aminoAcid) {
        output.push(aminoAcid)
      }
    }

    return output
  }
}

export default ProteinTranslation
