class RnaTranscription {

  String transcribe(String dnaStrand) {
    StringBuilder rnaStrand = new StringBuilder(dnaStrand.length());
    for (int i = 0; i < dnaStrand.length(); i++) {
      char dna = dnaStrand.charAt(i);
      rnaStrand.append(transcribeRNA(dna));
    }
    return rnaStrand.toString();
  }

  private char transcribeRNA(char dna) {
    switch (dna) {
      case 'C':
        return 'G';
      case 'G':
        return 'C';
      case 'T':
        return 'A';
      case 'A':
        return 'U';
      default:
        return '\0';
    }
  }

}