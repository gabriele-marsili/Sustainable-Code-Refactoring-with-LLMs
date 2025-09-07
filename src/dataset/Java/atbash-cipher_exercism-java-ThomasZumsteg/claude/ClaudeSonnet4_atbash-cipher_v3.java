public class Atbash {
    public static String decode(String ciperText) {
        if (ciperText == null || ciperText.isEmpty()) {
            return "";
        }
        
        StringBuilder clearText = new StringBuilder(ciperText.length());
        String lowerText = ciperText.toLowerCase();
        
        for (int i = 0; i < lowerText.length(); i++) {
            char c = lowerText.charAt(i);
            if (c >= '0' && c <= '9') {
                clearText.append(c);
            } else if (c >= 'a' && c <= 'z') {
                clearText.append((char) (219 - c));
            }
        }
        
        return clearText.toString();
    }

    public static String encode(String clearText) {
        if (clearText == null || clearText.isEmpty()) {
            return "";
        }
        
        StringBuilder cipherText = new StringBuilder(clearText.length() + clearText.length() / 5);
        String lowerText = clearText.toLowerCase();
        int charCount = 0;
        
        for (int i = 0; i < lowerText.length(); i++) {
            char c = lowerText.charAt(i);
            
            if (c >= '0' && c <= '9') {
                if (charCount > 0 && charCount % 5 == 0) {
                    cipherText.append(' ');
                }
                cipherText.append(c);
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

    private static String cipher(Character c) {
        if (c >= '0' && c <= '9')
            return String.valueOf(c);
        else if (c >= 'a' && c <= 'z')
            return String.valueOf((char) (219 - (int) c));
        else
            return "";
    }
}