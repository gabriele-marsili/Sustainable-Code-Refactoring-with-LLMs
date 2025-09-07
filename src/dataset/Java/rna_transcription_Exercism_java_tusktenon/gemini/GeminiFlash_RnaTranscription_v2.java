class RnaTranscription {
  String transcribe(String dnaStrand) {
    StringBuilder rna = new StringBuilder(dnaStrand.length());
    for (int i = 0; i < dnaStrand.length(); i++) {
      char dna = dnaStrand.charAt(i);
      char rnaNucleotide;
      switch (dna) {
        case 'A':
          rnaNucleotide = 'U';
          break;
        case 'C':
          rnaNucleotide = 'G';
          break;
        case 'G':
          rnaNucleotide = 'C';
          break;
        case 'T':
          rnaNucleotide = 'A';
          break;
        default:
          throw new IllegalArgumentException("Invalid nucleotide character");
      }
      rna.append(rnaNucleotide);
    }
    return rna.toString();
  }
}