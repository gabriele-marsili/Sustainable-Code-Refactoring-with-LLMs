class RnaTranscription {

    private static final char[] DNA_TO_RNA = new char[256];
    
    static {
        DNA_TO_RNA['C'] = 'G';
        DNA_TO_RNA['G'] = 'C';
        DNA_TO_RNA['T'] = 'A';
        DNA_TO_RNA['A'] = 'U';
    }

    String transcribe(String dnaStrand) {
        final int length = dnaStrand.length();
        final char[] result = new char[length];
        
        for (int i = 0; i < length; i++) {
            result[i] = DNA_TO_RNA[dnaStrand.charAt(i)];
        }
        
        return new String(result);
    }
}