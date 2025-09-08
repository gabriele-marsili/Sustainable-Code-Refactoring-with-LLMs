import java.util.List;
import java.util.ArrayList;

public class Crypto {
    private final String plainText;
    private final String normalizedPlaintext;
    private final int squareSize;

    public Crypto(String plainText) {
        this.plainText = plainText;
        this.normalizedPlaintext = normalize(plainText);
        this.squareSize = calculateSquareSize(this.normalizedPlaintext.length());
    }

    private String normalize(String text) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (Character.isLetterOrDigit(c)) {
                sb.append(Character.toLowerCase(c));
            }
        }
        return sb.toString();
    }

    private int calculateSquareSize(int normalizedLength) {
        return (int) Math.ceil(Math.sqrt(normalizedLength));
    }

    public String getNormalizedPlaintext() {
        return normalizedPlaintext;
    }

    public int getSquareSize() {
        return squareSize;
    }

    public List<String> getPlaintextSegments() {
        List<String> segments = new ArrayList<>();
        for (int i = 0; i < normalizedPlaintext.length(); i += squareSize) {
            int end = Math.min(i + squareSize, normalizedPlaintext.length());
            segments.add(normalizedPlaintext.substring(i, end));
        }
        return segments;
    }

    public String getCipherText() {
        StringBuilder cipherText = new StringBuilder();
        List<String> segments = getPlaintextSegments();
        for (int column = 0; column < squareSize; column++) {
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
        StringBuilder normalizedCipherText = new StringBuilder();
        int segmentLength = squareSize;
        for (int i = 0; i < cipherText.length(); i += segmentLength) {
            int end = Math.min(i + segmentLength, cipherText.length());
            normalizedCipherText.append(cipherText.substring(i, end));
            if (end < cipherText.length()) {
                normalizedCipherText.append(" ");
            }
        }
        return normalizedCipherText.toString();
    }
}