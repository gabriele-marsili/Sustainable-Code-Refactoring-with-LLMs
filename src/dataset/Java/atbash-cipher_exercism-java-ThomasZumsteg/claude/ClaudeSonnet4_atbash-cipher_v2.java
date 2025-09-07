public class Atbash {
    public static String decode(String ciperText) {
        StringBuilder clearText = new StringBuilder(ciperText.length());
        for (int i = 0; i < ciperText.length(); i++) {
            char c = ciperText.charAt(i);
            if (c >= '0' && c <= '9') {
                clearText.append(c);
            } else if (c >= 'A' && c <= 'Z') {
                clearText.append((char) (155 - c));
            } else if (c >= 'a' && c <= 'z') {
                clearText.append((char) (219 - c));
            }
        }
        return clearText.toString();
    }

    public static String encode(String clearText) {
        StringBuilder cipherText = new StringBuilder(clearText.length() + clearText.length() / 5);
        int charCount = 0;
        
        for (int i = 0; i < clearText.length(); i++) {
            char c = clearText.charAt(i);
            
            if (c >= '0' && c <= '9') {
                if (charCount > 0 && charCount % 5 == 0) {
                    cipherText.append(' ');
                }
                cipherText.append(c);
                charCount++;
            } else if (c >= 'A' && c <= 'Z') {
                if (charCount > 0 && charCount % 5 == 0) {
                    cipherText.append(' ');
                }
                cipherText.append((char) (155 - c));
                charCount++;
            } else if (c >= 'a' && c <= 'z') {
                if (charCount > 0 && charCount % 5 == 0) {
                    cipherText.append(' ');
                }
                cipherText.append((char) (219 - c));
                charCount++;
            }
        }
        return cipherText.toString();
    }
}