class RnaTranscription {

    private static final char[] RNA_NUCLEOTIDES = {'G', 'C', 'T', 'A'};
    private static final char[] DNA_TO_RNA = {'C', 'G', 'A', 'U'};

    String transcribe(String dnaStrand) {
        StringBuilder rnaStrand = new StringBuilder(dnaStrand.length());
        for (int i = 0; i < dnaStrand.length(); i++) {
            char dnaNucleotide = dnaStrand.charAt(i);
            for (int j = 0; j < RNA_NUCLEOTIDES.length; j++) {
                if (dnaNucleotide == RNA_NUCLEOTIDES[j]) {
                    rnaStrand.append(DNA_TO_RNA[j]);
                    break;
                }
            }
        }
        return rnaStrand.toString();
    }
}