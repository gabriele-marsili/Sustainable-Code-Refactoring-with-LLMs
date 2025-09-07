import java.util.Random;
import java.util.Arrays;

public class Cipher {
    private final int[] key;

    public Cipher() {
        Random random = new Random();
        key = random.ints(100, 0, 26).toArray();
    }

    public Cipher(String key) {
        if (key == null || key.isEmpty() || !key.matches("[a-z]+")) {
            throw new IllegalArgumentException();
        }
        this.key = key.chars().map(c -> c - 'a').toArray();
    }

    public String getKey() {
        StringBuilder sb = new StringBuilder(key.length);
        for (int k : key) {
            sb.append((char) ('a' + k));
        }
        return sb.toString();
    }

    public String encode(String plainText) {
        int keyLength = key.length;
        StringBuilder cipherText = new StringBuilder(plainText.length());
        for (int i = 0; i < plainText.length(); i++) {
            cipherText.append(shift(plainText.charAt(i), key[i % keyLength]));
        }
        return cipherText.toString();
    }

    public String decode(String cipherText) {
        int keyLength = key.length;
        StringBuilder plainText = new StringBuilder(cipherText.length());
        for (int i = 0; i < cipherText.length(); i++) {
            plainText.append(shift(cipherText.charAt(i), -key[i % keyLength]));
        }
        return plainText.toString();
    }

    private char shift(char c, int k) {
        int shiftedChar = c + k;
        if (shiftedChar < 'a') {
            shiftedChar += 26;
        } else if (shiftedChar > 'z') {
            shiftedChar -= 26;
        }
        return (char) shiftedChar;
    }
}