class RnaTranscription {

    String transcribe(String dnaStrand) {
        if (dnaStrand.isEmpty()) {
            return "";
        }
        
        char[] arr = dnaStrand.toCharArray();
        for (int i = 0; i < arr.length; i++) {
            char c = arr[i];
            if (c == 'C') {
                arr[i] = 'G';
            } else if (c == 'G') {
                arr[i] = 'C';
            } else if (c == 'T') {
                arr[i] = 'A';
            } else if (c == 'A') {
                arr[i] = 'U';
            }
        }
        return new String(arr);
    }

}