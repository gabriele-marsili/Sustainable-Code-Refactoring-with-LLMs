import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class ProteinTranslator {

  private static final Map<String, String> codons = new HashMap<>();
  static {
    codons.put("AUG", "Methionine");
    codons.put("UUU", "Phenylalanine");
    codons.put("UUC", "Phenylalanine");
    codons.put("UUA", "Leucine");
    codons.put("UUG", "Leucine");
    codons.put("UCU", "Serine");
    codons.put("UCC", "Serine");
    codons.put("UCA", "Serine");
    codons.put("UCG", "Serine");
    codons.put("UAU", "Tyrosine");
    codons.put("UAC", "Tyrosine");
    codons.put("UGU", "Cysteine");
    codons.put("UGC", "Cysteine");
    codons.put("UGG", "Tryptophan");
  }

  private static final Map<String, Boolean> stopCodons = new HashMap<>();
  static {
    stopCodons.put("UAA", true);
    stopCodons.put("UAG", true);
    stopCodons.put("UGA", true);
  }

  List<String> translate(String rnaSequence) {
    int length = rnaSequence.length();
    List<String> output = new ArrayList<>(length / 3);

    for (int i = 0; i < length - 2; i += 3) {
      String nextCodon = rnaSequence.substring(i, i + 3);

      if (stopCodons.containsKey(nextCodon)) {
        break;
      }
      
      String protein = codons.get(nextCodon);
      if (protein != null) {
        output.add(protein);
      }
    }
    return output;
  }
}