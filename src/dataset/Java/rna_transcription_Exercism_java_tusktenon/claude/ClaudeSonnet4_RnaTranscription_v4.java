class RnaTranscription {
  String transcribe(String dnaStrand) {
    if (dnaStrand.isEmpty()) {
      return "";
    }
    
    char[] result = new char[dnaStrand.length()];
    
    for (int i = 0; i < dnaStrand.length(); i++) {
      char nucleotide = dnaStrand.charAt(i);
      result[i] = switch (nucleotide) {
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