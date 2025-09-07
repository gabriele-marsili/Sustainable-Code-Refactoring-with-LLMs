class RnaTranscription {
  String transcribe(String dnaStrand) {
    char[] result = new char[dnaStrand.length()];
    for (int i = 0; i < dnaStrand.length(); i++) {
      result[i] = switch (dnaStrand.charAt(i)) {
        case 'A' -> 'U';
        case 'C' -> 'G';
        case 'G' -> 'C';
        case 'T' -> 'A';
        default -> throw new IllegalArgumentException("Invalid nucleotide character");
      };
    }
    return new String(result);
  }
}