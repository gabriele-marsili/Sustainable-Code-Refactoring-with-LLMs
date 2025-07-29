class RnaTranscription {
    private static final char [][] KEY = {{'G', 'C'}, {'C', 'G'}, {'T', 'A'}, {'A', 'U'}};

    String transcribe(String dnaStrand) {
        char dnaChar;
        char[] rnaStrand = new char[dnaStrand.length()];

        for(int i = 0; i<dnaStrand.length(); i++){
            dnaChar = dnaStrand.charAt(i);

            for (char[] chars : KEY) {
                if (dnaChar == chars[0])
                    rnaStrand[i] = chars[1];
            }
        }

        String transcribedRna = String.valueOf(rnaStrand);

        return transcribedRna;

    }

}
