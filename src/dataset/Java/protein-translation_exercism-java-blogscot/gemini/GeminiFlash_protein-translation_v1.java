import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class ProteinTranslator {

  private static final Map<String, String> codons = new HashMap<>();
  private static final List<String> stopCodons = List.of("UAA", "UAG", "UGA");

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

  List<String> translate(String rnaSequence) {
    List<String> output = new ArrayList<>();
    int sequenceLength = rnaSequence.length();

    for (int i = 0; i < sequenceLength; i += 3) {
      if (i + 3 > sequenceLength) {
        break; // or throw an exception, depending on desired behavior
      }
      String nextCodon = rnaSequence.substring(i, i + 3);

      if (stopCodons.contains(nextCodon)) {
        break;
      }

      String protein = codons.get(nextCodon);
      if (protein != null) {
        output.add(protein);
      } else {
        // Handle unknown codon, e.g., throw an exception or log a warning
        // For now, we'll just break the loop
        break;
      }
    }

    return output;
  }
}