public class RnaTranscription {
    public static String ofDna(String dna) {
        StringBuilder rna = new StringBuilder(dna.length());
        for (int i = 0; i < dna.length(); i++) {
            char c = dna.charAt(i);
            switch(c) {
                case 'C': rna.append('G'); break;
                case 'G': rna.append('C'); break;
                case 'T': rna.append('A'); break;
                case 'A': rna.append('U'); break;
            }
        }
        return rna.toString();
    }

    private static String fromDnaToRna(Character dna) {
        switch(dna) {
            case 'C': return "G";
            case 'G': return "C";
            case 'T': return "A";
            case 'A': return "U";
            default: return "";
        }
    }
}