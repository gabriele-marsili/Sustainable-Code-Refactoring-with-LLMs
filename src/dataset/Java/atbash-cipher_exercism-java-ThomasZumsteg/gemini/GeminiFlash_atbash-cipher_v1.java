public class Atbash {

    private static final int ATBASH_OFFSET = 219;
    private static final int GROUP_SIZE = 5;
    private static final char SPACE = ' ';

    public static String decode(String cipherText) {
        StringBuilder clearText = new StringBuilder();
        for (int i = 0; i < cipherText.length(); i++) {
            char c = Character.toLowerCase(cipherText.charAt(i));
            clearText.append(cipher(c));
        }
        return clearText.toString();
    }

    public static String encode(String clearText) {
        StringBuilder cipherText = new StringBuilder();
        int charCount = 0;
        for (int i = 0; i < clearText.length(); i++) {
            char c = Character.toLowerCase(clearText.charAt(i));
            String encodedChar = cipher(c);
            if (!encodedChar.isEmpty()) {
                if (charCount > 0 && charCount % GROUP_SIZE == 0) {
                    cipherText.append(SPACE);
                }
                cipherText.append(encodedChar);
                charCount++;
            }
        }
        return cipherText.toString();
    }

    private static String cipher(char c) {
        if ('0' <= c && c <= '9') {
            return String.valueOf(c);
        } else if ('a' <= c && c <= 'z') {
            return String.valueOf((char) (ATBASH_OFFSET - c));
        } else {
            return "";
        }
    }
}