import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class ProteinTranslator {

  private static final Map<String, String> CODONS = Map.ofEntries(
      Map.entry("AUG", "Methionine"),
      Map.entry("UUU", "Phenylalanine"),
      Map.entry("UUC", "Phenylalanine"),
      Map.entry("UUA", "Leucine"),
      Map.entry("UUG", "Leucine"),
      Map.entry("UCU", "Serine"),
      Map.entry("UCC", "Serine"),
      Map.entry("UCA", "Serine"),
      Map.entry("UCG", "Serine"),
      Map.entry("UAU", "Tyrosine"),
      Map.entry("UAC", "Tyrosine"),
      Map.entry("UGU", "Cysteine"),
      Map.entry("UGC", "Cysteine"),
      Map.entry("UGG", "Tryptophan")
  );

  private static final String[] STOP_CODONS = {"UAA", "UAG", "UGA"};

  List<String> translate(String rnaSequence) {
    List<String> output = new ArrayList<>();
    int length = rnaSequence.length();

    for (int i = 0; i < length; i += 3) {
      String nextCodon = rnaSequence.substring(i, i + 3);
      for (String stopCodon : STOP_CODONS) {
        if (nextCodon.equals(stopCodon)) {
          return output;
        }
      }
      output.add(CODONS.get(nextCodon));
    }
    return output;
  }
}