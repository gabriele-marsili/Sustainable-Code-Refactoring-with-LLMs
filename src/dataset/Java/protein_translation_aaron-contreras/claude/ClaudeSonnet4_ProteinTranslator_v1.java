import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

class ProteinTranslator {
    
    private static final Map<String, String> CODON_MAP = new HashMap<>();
    
    static {
        CODON_MAP.put("AUG", "Methionine");
        CODON_MAP.put("UUU", "Phenylalanine");
        CODON_MAP.put("UUC", "Phenylalanine");
        CODON_MAP.put("UUA", "Leucine");
        CODON_MAP.put("UUG", "Leucine");
        CODON_MAP.put("UCU", "Serine");
        CODON_MAP.put("UCC", "Serine");
        CODON_MAP.put("UCA", "Serine");
        CODON_MAP.put("UCG", "Serine");
        CODON_MAP.put("UAU", "Tyrosine");
        CODON_MAP.put("UAC", "Tyrosine");
        CODON_MAP.put("UGU", "Cysteine");
        CODON_MAP.put("UGC", "Cysteine");
        CODON_MAP.put("UGG", "Tryptophan");
    }

    List<String> translate(String rnaSequence) {
        List<String> result = new ArrayList<>();
        
        for (int i = 0; i <= rnaSequence.length() - 3; i += 3) {
            String trio = rnaSequence.substring(i, i + 3);
            
            if ("UAA".equals(trio) || "UAG".equals(trio) || "UGA".equals(trio)) {
                return result;
            }
            
            String protein = CODON_MAP.get(trio);
            if (protein != null) {
                result.add(protein);
            }
        }
        
        return result;
    }
}