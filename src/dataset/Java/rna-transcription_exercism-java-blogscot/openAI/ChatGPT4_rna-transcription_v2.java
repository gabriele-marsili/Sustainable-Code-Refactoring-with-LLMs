class RnaTranscription {

  String transcribe(String dnaStrand) {
    StringBuilder rnaStrand = new StringBuilder(dnaStrand.length());
    for (char c : dnaStrand.toCharArray()) {
      rnaStrand.append(transcribeRNA(c));
    }
    return rnaStrand.toString();
  }

  private char transcribeRNA(char rna) {
    switch (rna) {
      case 'C':
        return 'G';
      case 'G':
        return 'C';
      case 'T':
        return 'A';
      case 'A':
        return 'U';
      default:
        throw new IllegalArgumentException("Invalid DNA nucleotide: " + rna);
    }
  }

}