import java.util.Random;

public class Cipher {
    private final int[] key;

    public Cipher() {
        Random random = new Random();
        key = random.ints(100, 0, 'z' - 'a').toArray();
    }

    public Cipher(String key) {
        if (key.isEmpty() || !key.chars().allMatch(c -> c >= 'a' && c <= 'z')) {
            throw new IllegalArgumentException();
        }
        this.key = key.chars().map(c -> c - 'a').toArray();
    }

    public String getKey() {
        char[] keyChars = new char[key.length];
        for (int i = 0; i < key.length; i++) {
            keyChars[i] = (char) (key[i] + 'a');
        }
        return new String(keyChars);
    }

    public String encode(String plainText) {
        char[] cipherText = new char[plainText.length()];
        for (int i = 0; i < plainText.length(); i++) {
            cipherText[i] = shift(plainText.charAt(i), key[i % key.length]);
        }
        return new String(cipherText);
    }

    public String decode(String cipherText) {
        char[] plainText = new char[cipherText.length()];
        for (int i = 0; i < cipherText.length(); i++) {
            plainText[i] = shift(cipherText.charAt(i), -key[i % key.length]);
        }
        return new String(plainText);
    }

    private char shift(char c, int k) {
        int s = c + k;
        if (s < 'a') s += 'z' - 'a' + 1;
        else if (s > 'z') s -= 'z' - 'a' + 1;
        return (char) s;
    }
}