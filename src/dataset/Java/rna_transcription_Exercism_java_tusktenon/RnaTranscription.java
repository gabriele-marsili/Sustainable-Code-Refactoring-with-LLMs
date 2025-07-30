class RnaTranscription {
  String transcribe(String dnaStrand) {
    return dnaStrand
        .chars()
        .map(
            n ->
                switch (n) {
                  case 'A' -> 'U';
                  case 'C' -> 'G';
                  case 'G' -> 'C';
                  case 'T' -> 'A';
                  default -> throw new IllegalArgumentException("Invalid nucleotide character");
                })
        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
        .toString();
  }
}
