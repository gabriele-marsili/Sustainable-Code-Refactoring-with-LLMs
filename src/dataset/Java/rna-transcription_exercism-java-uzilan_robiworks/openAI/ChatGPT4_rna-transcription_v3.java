import java.util.Map;

class RnaTranscription {

    private static final Map<Character, Character> TRANSCRIPTION_MAP = Map.of(
        'C', 'G',
        'G', 'C',
        'T', 'A',
        'A', 'U'
    );

    String transcribe(String dnaStrand) {
        StringBuilder rnaStrand = new StringBuilder(dnaStrand.length());
        for (int i = 0; i < dnaStrand.length(); i++) {
            rnaStrand.append(TRANSCRIPTION_MAP.get(dnaStrand.charAt(i)));
        }
        return rnaStrand.toString();
    }

}