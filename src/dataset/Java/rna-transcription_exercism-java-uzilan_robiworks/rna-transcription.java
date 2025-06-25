class RnaTranscription {

    String transcribe(String dnaStrand) {
        char[] arr = dnaStrand.toCharArray();
        for (int i = 0; i < arr.length; i++) {
            switch (arr[i]) {
                case 'C':
                    arr[i] = 'G';
                    break;
                case 'G':
                    arr[i] = 'C';
                    break;
                case 'T':
                    arr[i] = 'A';
                    break;
                case 'A':
                    arr[i] = 'U';
                    break;
            }
        }
        return new String(arr);
    }

}
