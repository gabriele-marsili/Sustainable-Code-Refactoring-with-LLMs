class RnaTranscription {
    private static final char[][] KEY = {{'G', 'C'}, {'C', 'G'}, {'T', 'A'}, {'A', 'U'}};

    String transcribe(String dnaStrand) {
        int dnaLength = dnaStrand.length();
        char[] rnaStrand = new char[dnaLength];

        for (int i = 0; i < dnaLength; i++) {
            char dnaChar = dnaStrand.charAt(i);
            switch (dnaChar) {
                case 'G':
                    rnaStrand[i] = 'C';
                    break;
                case 'C':
                    rnaStrand[i] = 'G';
                    break;
                case 'T':
                    rnaStrand[i] = 'A';
                    break;
                case 'A':
                    rnaStrand[i] = 'U';
                    break;
                default:
                    // Handle invalid input (optional, but good practice)
                    rnaStrand[i] = dnaChar; // Or throw an exception
                    break;
            }
        }

        return new String(rnaStrand);
    }
}