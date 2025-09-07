class RnaTranscription {

    String transcribe(String dnaStrand) {
        StringBuilder result = new StringBuilder(dnaStrand.length());
        for (int i = 0; i < dnaStrand.length(); i++) {
            switch (dnaStrand.charAt(i)) {
                case 'C' -> result.append('G');
                case 'G' -> result.append('C');
                case 'T' -> result.append('A');
                case 'A' -> result.append('U');
            }
        }
        return result.toString();
    }

}