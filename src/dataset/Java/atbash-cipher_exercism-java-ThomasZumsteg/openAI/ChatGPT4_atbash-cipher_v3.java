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
            String encodedChar = cipher(c);
            if (!encodedChar.isEmpty()) {
                if (count == 5) {
                    cipherText.append(" ");
                    count = 0;
                }
                cipherText.append(encodedChar);
                count++;
            }
        }
        return cipherText.toString();
    }

    private static String cipher(char c) {
        if (c >= '0' && c <= '9') {
            return String.valueOf(c);
        } else if (c >= 'a' && c <= 'z') {
            return String.valueOf((char) ('z' - (c - 'a')));
        } else {
            return "";
        }
    }
}