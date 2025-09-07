class RnaTranscription {

    private static final char[] DNA_TO_RNA = {'G', 'C', 'T', 'A'};
    private static final char[] RNA_EQUIVALENTS = {'C', 'G', 'A', 'U'};

    String transcribe(String dnaStrand) {
        int n = dnaStrand.length();
        StringBuilder rnaStrand = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            char dnaNucleotide = dnaStrand.charAt(i);
            int index = -1;
            for (int j = 0; j < DNA_TO_RNA.length; j++) {
                if (DNA_TO_RNA[j] == dnaNucleotide) {
                    index = j;
                    break;
                }
            }
            if (index != -1) {
                rnaStrand.append(RNA_EQUIVALENTS[index]);
            }
        }
        return rnaStrand.toString();
    }
}