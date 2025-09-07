class RnaTranscription {

    private static final char[] TRANSCRIPTION_MAP = new char[128];
    
    static {
        TRANSCRIPTION_MAP['G'] = 'C';
        TRANSCRIPTION_MAP['C'] = 'G';
        TRANSCRIPTION_MAP['T'] = 'A';
        TRANSCRIPTION_MAP['A'] = 'U';
    }

    String transcribe(String dnaStrand) {
        char[] result = new char[dnaStrand.length()];
        for (int i = 0; i < dnaStrand.length(); i++) {
            result[i] = TRANSCRIPTION_MAP[dnaStrand.charAt(i)];
        }
        return new String(result);
    }
}