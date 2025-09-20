import java.util.Random;

public class Cipher {
    private int[] key;

    public Cipher() {
        Random random = new Random();
        key = new int[100];
        for (int i = 0; i < 100; i++) {
            key[i] = random.nextInt(26);
        }
    }

    public Cipher(String key) {
        if (key.isEmpty()) {
            throw new IllegalArgumentException();
        }
        
        int length = key.length();
        this.key = new int[length];
        
        for (int i = 0; i < length; i++) {
            char c = key.charAt(i);
            if (c < 'a' || c > 'z') {
                throw new IllegalArgumentException();
            }
            this.key[i] = c - 'a';
        }
    }

    public String getKey() {
        StringBuilder sb = new StringBuilder(key.length);
        for (int k : key) {
            sb.append((char)(k + 'a'));
        }
        return sb.toString();
    }

    public String encode(String plainText) {
        int length = plainText.length();
        StringBuilder result = new StringBuilder(length);
        int keyLength = key.length;
        
        for (int i = 0; i < length; i++) {
            result.append(shift(plainText.charAt(i), key[i % keyLength]));
        }
        return result.toString();
    }

    public String decode(String cipherText) {
        int length = cipherText.length();
        StringBuilder result = new StringBuilder(length);
        int keyLength = key.length;
        
        for (int i = 0; i < length; i++) {
            result.append(shift(cipherText.charAt(i), -key[i % keyLength]));
        }
        return result.toString();
    }

    private char shift(char c, int k) {
        int shifted = c + k;
        if (shifted < 'a') {
            shifted += 26;
        } else if (shifted > 'z') {
            shifted -= 26;
        }
        return (char) shifted;
    }
}