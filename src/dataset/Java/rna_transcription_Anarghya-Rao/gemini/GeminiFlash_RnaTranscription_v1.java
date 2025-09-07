class RnaTranscription {
    private static final char[] DNA = {'G', 'C', 'T', 'A'};
    private static final char[] RNA = {'C', 'G', 'A', 'U'};

    String transcribe(String dnaStrand) {
        int dnaLength = dnaStrand.length();
        StringBuilder rnaStrand = new StringBuilder(dnaLength);

        for (int i = 0; i < dnaLength; i++) {
            char dnaChar = dnaStrand.charAt(i);
            int index = -1;

            for (int j = 0; j < DNA.length; j++) {
                if (dnaChar == DNA[j]) {
                    index = j;
                    break;
                }
            }

            if (index != -1) {
                rnaStrand.append(RNA[index]);
            }
        }

        return rnaStrand.toString();
    }
}