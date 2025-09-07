class RnaTranscription {

    String transcribe(String dnaStrand) {
        StringBuilder rna = new StringBuilder(dnaStrand.length());
        for (int i = 0; i < dnaStrand.length(); i++) {
            char dna = dnaStrand.charAt(i);
            switch (dna) {
                case 'C':
                    rna.append('G');
                    break;
                case 'G':
                    rna.append('C');
                    break;
                case 'T':
                    rna.append('A');
                    break;
                case 'A':
                    rna.append('U');
                    break;
                default:
                    rna.append(dna); // Handle unexpected characters gracefully
                    break;
            }
        }
        return rna.toString();
    }
}