import java.util.Map;

public class RnaTranscription {
    private static final Map<Character, Character> DNA_TO_RNA = Map.of(
        'C', 'G',
        'G', 'C',
        'T', 'A',
        'A', 'U'
    );

    public static String ofDna(String dna) {
        StringBuilder rna = new StringBuilder(dna.length());
        for (char c : dna.toCharArray()) {
            rna.append(DNA_TO_RNA.getOrDefault(c, '\0'));
        }
        return rna.toString();
    }

    private static String fromDnaToRna(Character dna) {
        return String.valueOf(DNA_TO_RNA.getOrDefault(dna, '\0'));
    }
}