class RnaTranscription {

  String transcribe(String dnaStrand) {
    StringBuilder rnaStrand = new StringBuilder(dnaStrand.length());
    for (int i = 0; i < dnaStrand.length(); i++) {
      rnaStrand.append(transcribeRNA(dnaStrand.charAt(i)));
    }
    return rnaStrand.toString();
  }

  private char transcribeRNA(char nucleotide) {
    switch (nucleotide) {
      case 'C':
        return 'G';
      case 'G':
        return 'C';
      case 'T':
        return 'A';
      case 'A':
        return 'U';
      default:
        throw new IllegalArgumentException("Invalid DNA nucleotide: " + nucleotide);
    }
  }

}