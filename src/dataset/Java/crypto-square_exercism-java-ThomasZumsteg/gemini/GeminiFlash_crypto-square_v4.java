import java.util.List;
import java.util.ArrayList;

public class Crypto {
    private final String plainText;
    private String normalizedPlaintext;
    private int squareSize;

    public Crypto(String plainText) {
        this.plainText = plainText;
        this.normalizedPlaintext = null;
        this.squareSize = 0;
    }

    public String getNormalizedPlaintext() {
        if (normalizedPlaintext == null) {
            normalizedPlaintext = plainText.toLowerCase()
                    .replaceAll("[^a-zA-Z0-9]", "");
        }
        return normalizedPlaintext;
    }

    public int getSquareSize() {
        if (squareSize == 0) {
            int len = getNormalizedPlaintext().length();
            squareSize = (int) Math.ceil(Math.sqrt(len));
        }
        return squareSize;
    }

    public List<String> getPlaintextSegments() {
        List<String> segments = new ArrayList<>();
        int size = getSquareSize();
        String normalizedPlaintext = getNormalizedPlaintext();
        int length = normalizedPlaintext.length();
        for (int i = 0; i < length; i += size) {
            segments.add(normalizedPlaintext.substring(i, Math.min(i + size, length)));
        }
        return segments;
    }

    public String getCipherText() {
        int size = getSquareSize();
        List<String> segments = getPlaintextSegments();
        StringBuilder cipherText = new StringBuilder();
        for (int column = 0; column < size; column++) {
            for (String segment : segments) {
                if (column < segment.length()) {
                    cipherText.append(segment.charAt(column));
                }
            }
        }
        return cipherText.toString();
    }

    public String getNormalizedCipherText() {
        String cipherText = getCipherText();
        int size = getSquareSize();
        StringBuilder normalizedCipherText = new StringBuilder();
        for (int i = 0; i < cipherText.length(); i += size) {
            int end = Math.min(i + size, cipherText.length());
            if (i > 0) {
                normalizedCipherText.append(" ");
            }
            normalizedCipherText.append(cipherText.substring(i, end));
        }
        return normalizedCipherText.toString();
    }
}