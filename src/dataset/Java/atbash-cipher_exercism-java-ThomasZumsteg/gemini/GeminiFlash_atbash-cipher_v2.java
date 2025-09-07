public class Atbash {

    private static final int ATBASH_OFFSET = 219;

    public static String decode(String cipherText) {
        StringBuilder clearText = new StringBuilder();
        cipherText = cipherText.toLowerCase();
        for (int i = 0; i < cipherText.length(); i++) {
            char c = cipherText.charAt(i);
            clearText.append(cipher(c));
        }
        return clearText.toString();
    }

    public static String encode(String clearText) {
        StringBuilder cipherText = new StringBuilder();
        clearText = clearText.toLowerCase();
        int count = 0;
        for (int i = 0; i < clearText.length(); i++) {
            char c = clearText.charAt(i);
            String encodedChar = cipher(c);
            if (!encodedChar.isEmpty()) {
                if (count > 0 && count % 5 == 0) {
                    cipherText.append(" ");
                }
                cipherText.append(encodedChar);
                count++;
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