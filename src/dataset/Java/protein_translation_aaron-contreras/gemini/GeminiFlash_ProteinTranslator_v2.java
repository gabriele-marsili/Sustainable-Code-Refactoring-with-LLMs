import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

class ProteinTranslator {

    private static final Map<String, String> codonMap = new HashMap<>();

    static {
        codonMap.put("AUG", "Methionine");
        codonMap.put("UUU", "Phenylalanine");
        codonMap.put("UUC", "Phenylalanine");
        codonMap.put("UUA", "Leucine");
        codonMap.put("UUG", "Leucine");
        codonMap.put("UCU", "Serine");
        codonMap.put("UCC", "Serine");
        codonMap.put("UCA", "Serine");
        codonMap.put("UCG", "Serine");
        codonMap.put("UAU", "Tyrosine");
        codonMap.put("UAC", "Tyrosine");
        codonMap.put("UGU", "Cysteine");
        codonMap.put("UGC", "Cysteine");
        codonMap.put("UGG", "Tryptophan");
    }

    List<String> translate(String rnaSequence) {

        List<String> result = new ArrayList<>();
        int len = rnaSequence.length();

        for (int i = 0; i < len; i += 3) {
            if (i + 3 > len) {
                break; // Handle incomplete codons at the end
            }
            String codon = rnaSequence.substring(i, i + 3);

            if (codon.equals("UAA") || codon.equals("UAG") || codon.equals("UGA")) {
                return result;
            }

            String protein = codonMap.get(codon);
            if (protein != null) {
                result.add(protein);
            }
        }
        return result;
    }
}