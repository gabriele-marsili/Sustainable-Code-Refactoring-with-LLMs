class RnaTranscription {
  private static final char[] transcriptionMap = new char[256];

  static {
    transcriptionMap['A'] = 'U';
    transcriptionMap['C'] = 'G';
    transcriptionMap['G'] = 'C';
    transcriptionMap['T'] = 'A';
  }

  String transcribe(String dnaStrand) {
    int length = dnaStrand.length();
    StringBuilder rnaStrand = new StringBuilder(length);

    for (int i = 0; i < length; i++) {
      char dnaNucleotide = dnaStrand.charAt(i);
      if (dnaNucleotide >= transcriptionMap.length || transcriptionMap[dnaNucleotide] == '\0') {
        throw new IllegalArgumentException("Invalid nucleotide character");
      }
      rnaStrand.append(transcriptionMap[dnaNucleotide]);
    }

    return rnaStrand.toString();
  }
}