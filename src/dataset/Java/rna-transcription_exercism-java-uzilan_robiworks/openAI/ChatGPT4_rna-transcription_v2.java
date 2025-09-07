class RnaTranscription {

    String transcribe(String dnaStrand) {
        StringBuilder rnaStrand = new StringBuilder(dnaStrand.length());
        for (int i = 0; i < dnaStrand.length(); i++) {
            switch (dnaStrand.charAt(i)) {
                case 'C' -> rnaStrand.append('G');
                case 'G' -> rnaStrand.append('C');
                case 'T' -> rnaStrand.append('A');
                case 'A' -> rnaStrand.append('U');
            }
        }
        return rnaStrand.toString();
    }

}