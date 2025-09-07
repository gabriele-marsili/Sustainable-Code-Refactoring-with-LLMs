public class Atbash {
    public static String decode(String ciperText) {
        StringBuilder clearText = new StringBuilder();
        String lowerCiperText = ciperText.toLowerCase();
        for (int i = 0; i < lowerCiperText.length(); i++) {
            char c = lowerCiperText.charAt(i);
            clearText.append(cipher(c));
        }
        return clearText.toString();
    }

    public static String encode(String clearText) {
        StringBuilder cipherText = new StringBuilder();
        String lowerClearText = clearText.toLowerCase();
        for (int i = 0; i < lowerClearText.length(); i++) {
            char c = lowerClearText.charAt(i);
            if (cipherText.length() % 6 == 5) {
                cipherText.append(' ');
            }
            cipherText.append(cipher(c));
        }
        return cipherText.toString().trim();
    }

    private static String cipher(char c) {
        if ('0' <= c && c <= '9') {
            return String.valueOf(c);
        } else if ('a' <= c && c <= 'z') {
            return String.valueOf((char) (219 - c));
        } else {
            return "";
        }
    }
}