class RnaTranscription {

    String transcribe(String dnaStrand) {
        char[] result = new char[dnaStrand.length()];
        for (int i = 0; i < dnaStrand.length(); i++) {
            switch (dnaStrand.charAt(i)) {
                case 'G' -> result[i] = 'C';
                case 'C' -> result[i] = 'G';
                case 'T' -> result[i] = 'A';
                case 'A' -> result[i] = 'U';
                default -> throw new IllegalArgumentException("Invalid DNA nucleotide: " + dnaStrand.charAt(i));
            }
        }
        return new String(result);
    }
}