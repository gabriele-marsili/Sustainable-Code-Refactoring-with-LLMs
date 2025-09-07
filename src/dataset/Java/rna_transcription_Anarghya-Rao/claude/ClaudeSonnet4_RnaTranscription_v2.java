class RnaTranscription {
    private static final char[] DNA_CHARS = {'G', 'C', 'T', 'A'};
    private static final char[] RNA_CHARS = {'C', 'G', 'A', 'U'};

    String transcribe(String dnaStrand) {
        char[] rnaStrand = new char[dnaStrand.length()];
        
        for(int i = 0; i < dnaStrand.length(); i++){
            char dnaChar = dnaStrand.charAt(i);
            
            switch(dnaChar) {
                case 'G': rnaStrand[i] = 'C'; break;
                case 'C': rnaStrand[i] = 'G'; break;
                case 'T': rnaStrand[i] = 'A'; break;
                case 'A': rnaStrand[i] = 'U'; break;
            }
        }
        
        return new String(rnaStrand);
    }
}