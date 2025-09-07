class RnaTranscription {

  String transcribe(String dnaStrand) {
    StringBuilder result = new StringBuilder(dnaStrand.length());
    for (int i = 0; i < dnaStrand.length(); i++) {
      result.append(transcribeRNA(dnaStrand.charAt(i)));
    }
    return result.toString();
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