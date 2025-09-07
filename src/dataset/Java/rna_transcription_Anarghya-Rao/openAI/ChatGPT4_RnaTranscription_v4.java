import java.util.Map;

class RnaTranscription {
    private static final Map<Character, Character> TRANSCRIPTION_MAP = Map.of(
        'G', 'C',
        'C', 'G',
        'T', 'A',
        'A', 'U'
    );

    String transcribe(String dnaStrand) {
        char[] rnaStrand = new char[dnaStrand.length()];

        for (int i = 0; i < dnaStrand.length(); i++) {
            rnaStrand[i] = TRANSCRIPTION_MAP.get(dnaStrand.charAt(i));
        }

        return new String(rnaStrand);
    }
}