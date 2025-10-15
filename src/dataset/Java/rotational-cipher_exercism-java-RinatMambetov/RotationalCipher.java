class RotationalCipher {
    private final int shiftKey;

    RotationalCipher(int shiftKey) {
        final int ALPHABET_LENGTH = 26;
        this.shiftKey = shiftKey % ALPHABET_LENGTH;
    }

    String rotate(String data) {
        String lowerAlph = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
        String upperAlph = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < data.length(); i++) {
            char ch = data.charAt(i);
            if (Character.isAlphabetic(ch)) {
                if (Character.isUpperCase(ch)) {
                    result.append(upperAlph.charAt(upperAlph.indexOf(ch) + shiftKey));
                } else {
                    result.append(lowerAlph.charAt(lowerAlph.indexOf(ch) + shiftKey));
                }
            } else {
                result.append(ch);
            }
        }
        return result.toString();
    }
}
