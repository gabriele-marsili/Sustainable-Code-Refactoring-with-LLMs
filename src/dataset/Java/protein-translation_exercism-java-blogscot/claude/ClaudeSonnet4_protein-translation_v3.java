import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class ProteinTranslator {

  private static final Map<String, String> codons = Map.of(
      "AUG", "Methionine",
      "UUU", "Phenylalanine",
      "UUC", "Phenylalanine",
      "UUA", "Leucine",
      "UUG", "Leucine",
      "UCU", "Serine",
      "UCC", "Serine",
      "UCA", "Serine",
      "UCG", "Serine",
      "UAU", "Tyrosine",
      "UAC", "Tyrosine",
      "UGU", "Cysteine",
      "UGC", "Cysteine",
      "UGG", "Tryptophan"
  );

  private static final Map<String, Boolean> stopCodons = Map.of(
      "UAA", true,
      "UAG", true,
      "UGA", true
  );

  List<String> translate(String rnaSequence) {
    int length = rnaSequence.length();
    int capacity = length / 3;
    List<String> output = new ArrayList<>(capacity);

    for (int i = 0; i + 2 < length; i += 3) {
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