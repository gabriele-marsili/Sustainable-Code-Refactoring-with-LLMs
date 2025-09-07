public class RnaTranscription {
    public static String ofDna(String dna) {
        StringBuilder rna = new StringBuilder(dna.length());
        for (int i = 0; i < dna.length(); i++) {
            rna.append(fromDnaToRna(dna.charAt(i)));
        }
        return rna.toString();
    }

    private static char fromDnaToRna(char dna) {
        switch (dna) {
            case 'C': return 'G';
            case 'G': return 'C';
            case 'T': return 'A';
            case 'A': return 'U';
            default: return '\0';
        }
    }
}