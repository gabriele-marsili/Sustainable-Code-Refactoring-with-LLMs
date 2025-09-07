public class Atbash {
    public static String decode(String ciperText) {
        StringBuilder clearText = new StringBuilder(ciperText.length());
        char[] chars = ciperText.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];
            if (c >= 'A' && c <= 'Z') {
                c = (char) (c + 32); // Convert to lowercase
            }
            cipher(c, clearText);
        }
        return clearText.toString();
    }

    public static String encode(String clearText) {
        StringBuilder cipherText = new StringBuilder(clearText.length() + clearText.length() / 5);
        char[] chars = clearText.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];
            if (c >= 'A' && c <= 'Z') {
                c = (char) (c + 32); // Convert to lowercase
            }
            if (cipherText.length() % 6 == 5) {
                cipherText.append(' ');
            }
            cipher(c, cipherText);
        }
        // Trim trailing space if exists
        int len = cipherText.length();
        if (len > 0 && cipherText.charAt(len - 1) == ' ') {
            cipherText.setLength(len - 1);
        }
        return cipherText.toString();
    }

    private static String cipher(Character c) {
        if (c >= '0' && c <= '9') {
            return String.valueOf(c);
        } else if (c >= 'a' && c <= 'z') {
            return String.valueOf((char) (219 - c));
        } else {
            return "";
        }
    }

    private static void cipher(char c, StringBuilder sb) {
        if (c >= '0' && c <= '9') {
            sb.append(c);
        } else if (c >= 'a' && c <= 'z') {
            sb.append((char) (219 - c));
        }
    }
}