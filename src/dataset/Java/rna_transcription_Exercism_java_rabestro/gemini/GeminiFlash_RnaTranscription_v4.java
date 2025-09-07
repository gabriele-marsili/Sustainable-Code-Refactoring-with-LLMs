class RnaTranscription {

    private static final char[] RNA_MAPPING = {'G', 'C', 'T', 'A'};
    private static final char[] DNA_TO_RNA = {'C', 'G', 'A', 'U'};

    String transcribe(String dnaStrand) {
        int n = dnaStrand.length();
        StringBuilder rnaStrand = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            char dnaNucleotide = dnaStrand.charAt(i);
            int index = -1;
            for (int j = 0; j < RNA_MAPPING.length; j++) {
                if (RNA_MAPPING[j] == dnaNucleotide) {
                    index = j;
                    break;
                }
            }
            if (index != -1) {
                rnaStrand.append(DNA_TO_RNA[index]);
            }
        }
        return rnaStrand.toString();
    }
}