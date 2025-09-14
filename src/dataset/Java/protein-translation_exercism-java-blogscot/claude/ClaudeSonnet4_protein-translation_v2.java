import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

class ProteinTranslator {

  private static final Map<String, String> codons = new HashMap<>();
  private static final Set<String> stopCodons = Set.of("UAA", "UAG", "UGA");
  
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
    int length = rnaSequence.length();
    
    for (int i = 0; i < length - 2; i += 3) {
      String nextCodon = rnaSequence.substring(i, i + 3);
      
      if (stopCodons.contains(nextCodon)) {
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