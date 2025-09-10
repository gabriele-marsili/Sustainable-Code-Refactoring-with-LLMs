import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class ProteinTranslator {

  private static final Map<String, String> CODONS = new HashMap<>();
  private static final List<String> STOP_CODONS = List.of("UAA", "UAG", "UGA");

  static {
    CODONS.put("AUG", "Methionine");
    CODONS.put("UUU", "Phenylalanine");
    CODONS.put("UUC", "Phenylalanine");
    CODONS.put("UUA", "Leucine");
    CODONS.put("UUG", "Leucine");
    CODONS.put("UCU", "Serine");
    CODONS.put("UCC", "Serine");
    CODONS.put("UCA", "Serine");
    CODONS.put("UCG", "Serine");
    CODONS.put("UAU", "Tyrosine");
    CODONS.put("UAC", "Tyrosine");
    CODONS.put("UGU", "Cysteine");
    CODONS.put("UGC", "Cysteine");
    CODONS.put("UGG", "Tryptophan");
  }

  List<String> translate(String rnaSequence) {
    List<String> output = new ArrayList<>();
    int length = rnaSequence.length();

    for (int i = 0; i < length; i += 3) {
      String nextCodon = rnaSequence.substring(i, i + 3);

      if (STOP_CODONS.contains(nextCodon)) {
        break;
      }

      String protein = CODONS.get(nextCodon);
      if (protein != null) {
        output.add(protein);
      }
    }
    return output;
  }
}