import java.util.stream.Collectors;

class RnaTranscription {

  String transcribe(String dnaStrand) {
    return dnaStrand
        .chars()
        .mapToObj(c -> transcribeRNA(Character.toString(c)))
        .collect(Collectors.joining());
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
