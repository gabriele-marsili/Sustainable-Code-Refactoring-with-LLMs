class RnaTranscription {

    String transcribe(String dnaStrand) {
        char[] result = new char[dnaStrand.length()];
        for (int i = 0; i < dnaStrand.length(); i++) {
            char c = dnaStrand.charAt(i);
            switch (c) {
                case 'G': result[i] = 'C'; break;
                case 'C': result[i] = 'G'; break;
                case 'T': result[i] = 'A'; break;
                case 'A': result[i] = 'U'; break;
            }
        }
        return new String(result);
    }
}