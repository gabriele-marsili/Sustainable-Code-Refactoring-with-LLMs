public class Atbash {
    public static String decode(String cipherText) {
        StringBuilder clearText = new StringBuilder();
        for (char c : cipherText.toLowerCase().toCharArray()) {
            clearText.append(cipher(c));
        }
        return clearText.toString();
    }

    public static String encode(String clearText) {
        StringBuilder cipherText = new StringBuilder();
        int count = 0;
        for (char c : clearText.toLowerCase().toCharArray()) {
            if (count == 5) {
                cipherText.append(" ");
                count = 0;
            }
            String encodedChar = cipher(c);
            if (!encodedChar.isEmpty()) {
                cipherText.append(encodedChar);
                count++;
            }
        }
        return cipherText.toString().trim();
    }

    private static String cipher(char c) {
        if ('0' <= c && c <= '9') {
            return String.valueOf(c);
        } else if ('a' <= c && c <= 'z') {
            return String.valueOf((char) ('z' - (c - 'a')));
        } else {
            return "";
        }
    }
}