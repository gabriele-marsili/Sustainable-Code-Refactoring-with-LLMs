public class Atbash {
    public static String decode(String ciperText) {
        StringBuilder clearText = new StringBuilder(ciperText.length());
        String lowerCiperText = ciperText.toLowerCase();
        for (int i = 0; i < lowerCiperText.length(); i++) {
            clearText.append(cipher(lowerCiperText.charAt(i)));
        }
        return clearText.toString();
    }

    public static String encode(String clearText) {
        StringBuilder cipherText = new StringBuilder();
        String lowerClearText = clearText.toLowerCase();
        for (int i = 0; i < lowerClearText.length(); i++) {
            if (cipherText.length() % 6 == 5) {
                cipherText.append(' ');
            }
            char c = lowerClearText.charAt(i);
            String cipheredChar = cipher(c);
            cipherText.append(cipheredChar);
        }
        int len = cipherText.length();
        while (len > 0 && cipherText.charAt(len - 1) == ' ') {
            len--;
        }
        return cipherText.substring(0, len);
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