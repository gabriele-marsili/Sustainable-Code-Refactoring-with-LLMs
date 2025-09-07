import java.util.List;
import java.util.ArrayList;
import java.util.Map;

class ProteinTranslator {

    private static final Map<String, String> CODON_TO_PROTEIN = Map.ofEntries(
        Map.entry("AUG", "Methionine"),
        Map.entry("UUU", "Phenylalanine"), Map.entry("UUC", "Phenylalanine"),
        Map.entry("UUA", "Leucine"), Map.entry("UUG", "Leucine"),
        Map.entry("UCU", "Serine"), Map.entry("UCC", "Serine"),
        Map.entry("UCA", "Serine"), Map.entry("UCG", "Serine"),
        Map.entry("UAU", "Tyrosine"), Map.entry("UAC", "Tyrosine"),
        Map.entry("UGU", "Cysteine"), Map.entry("UGC", "Cysteine"),
        Map.entry("UGG", "Tryptophan")
    );

    private static final List<String> STOP_CODONS = List.of("UAA", "UAG", "UGA");

    List<String> translate(String rnaSequence) {
        List<String> result = new ArrayList<>();
        int length = rnaSequence.length();

        for (int i = 0; i <= length - 3; i += 3) {
            String codon = rnaSequence.substring(i, i + 3);
            if (STOP_CODONS.contains(codon)) {
                break;
            }
            String protein = CODON_TO_PROTEIN.get(codon);
            if (protein != null) {
                result.add(protein);
            }
        }
        return result;
    }
}