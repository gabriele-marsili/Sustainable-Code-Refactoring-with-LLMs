import java.util.Arrays;
import java.util.Random;

public class Cipher {
    private final int[] key;

    public Cipher() {
        Random random = new Random();
        key = IntStream.generate(() -> random.nextInt(26))
                .limit(100)
                .toArray();
    }

    public Cipher(String key) {
        if (key == null || key.isEmpty() || !key.matches("[a-z]+")) {
            throw new IllegalArgumentException();
        }
        this.key = key.chars()
                .map(c -> c - 'a')
                .toArray();
    }

    public String getKey() {
        return new String(Arrays.stream(key)
                .map(c -> c + 'a')
                .toArray(), 0, key.length);
    }

    public String encode(String plainText) {
        int len = plainText.length();
        char[] cipherText = new char[len];
        int keyLen = key.length;

        for (int i = 0; i < len; i++) {
            cipherText[i] = shift(plainText.charAt(i), key[i % keyLen]);
        }
        return new String(cipherText);
    }

    public String decode(String cipherText) {
        int len = cipherText.length();
        char[] plainText = new char[len];
        int keyLen = key.length;

        for (int i = 0; i < len; i++) {
            plainText[i] = shift(cipherText.charAt(i), -key[i % keyLen]);
        }
        return new String(plainText);
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