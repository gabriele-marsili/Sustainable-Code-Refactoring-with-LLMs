class RnaTranscription {

  String transcribe(String dnaStrand) {
    StringBuilder result = new StringBuilder(dnaStrand.length());
    for (int i = 0; i < dnaStrand.length(); i++) {
      char c = dnaStrand.charAt(i);
      switch (c) {
        case 'C':
          result.append('G');
          break;
        case 'G':
          result.append('C');
          break;
        case 'T':
          result.append('A');
          break;
        case 'A':
          result.append('U');
          break;
      }
    }
    return result.toString();
  }

  private String transcribeRNA(String rna) {
    switch (rna) {
      case "C":
        return "G";
      case "G":
        return "C";
      case "T":
        return "A";
      case "A":
        return "U";
    }
    return "";
  }

}