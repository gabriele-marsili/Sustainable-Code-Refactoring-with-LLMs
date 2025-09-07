class RnaTranscription {

    String transcribe(String dnaStrand) {
        char[] transcriptionMap = new char[128];
        transcriptionMap['G'] = 'C';
        transcriptionMap['C'] = 'G';
        transcriptionMap['T'] = 'A';
        transcriptionMap['A'] = 'U';

        StringBuilder result = new StringBuilder(dnaStrand.length());
        for (int i = 0; i < dnaStrand.length(); i++) {
            result.append(transcriptionMap[dnaStrand.charAt(i)]);
        }
        return result.toString();
    }
}