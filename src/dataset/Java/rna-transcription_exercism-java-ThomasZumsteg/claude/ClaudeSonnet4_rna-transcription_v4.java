public class RnaTranscription {
    private static final char[] DNA_TO_RNA = new char[256];
    
    static {
        DNA_TO_RNA['C'] = 'G';
        DNA_TO_RNA['G'] = 'C';
        DNA_TO_RNA['T'] = 'A';
        DNA_TO_RNA['A'] = 'U';
    }
    
    public static String ofDna(String dna) {
        if (dna == null || dna.isEmpty()) {
            return "";
        }
        
        char[] dnaChars = dna.toCharArray();
        char[] rnaChars = new char[dnaChars.length];
        
        for (int i = 0; i < dnaChars.length; i++) {
            rnaChars[i] = fromDnaToRna(dnaChars[i]);
        }
        
        return new String(rnaChars);
    }

    private static char fromDnaToRna(char dna) {
        return DNA_TO_RNA[dna];
    }
}