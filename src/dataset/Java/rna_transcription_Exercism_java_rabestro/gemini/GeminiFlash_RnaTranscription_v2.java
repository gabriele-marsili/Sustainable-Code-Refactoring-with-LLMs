class RnaTranscription {

    private static final char[] RNA_EQUIVALENTS = {'G', 'C', 'A', 'U'};

    String transcribe(String dnaStrand) {
        StringBuilder rna = new StringBuilder(dnaStrand.length());
        for (int i = 0; i < dnaStrand.length(); i++) {
            char dnaNucleotide = dnaStrand.charAt(i);
            switch (dnaNucleotide) {
                case 'G':
                    rna.append('C');
                    break;
                case 'C':
                    rna.append('G');
                    break;
                case 'T':
                    rna.append('A');
                    break;
                case 'A':
                    rna.append('U');
                    break;
                default:
                    // Handle invalid input (optional, but good practice)
                    // You might throw an exception or append a default character
                    throw new IllegalArgumentException("Invalid DNA nucleotide: " + dnaNucleotide);
            }
        }
        return rna.toString();
    }
}