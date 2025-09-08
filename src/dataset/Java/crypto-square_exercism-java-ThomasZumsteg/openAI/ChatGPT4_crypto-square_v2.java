import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class Crypto {
    private final String plainText;
    private final String normalizedPlainText;
    private final int squareSize;

    public Crypto(String plainText) {
        this.plainText = plainText;
        this.normalizedPlainText = normalizePlaintext(plainText);
        this.squareSize = (int) Math.ceil(Math.sqrt(normalizedPlainText.length()));
    }

    private String normalizePlaintext(String text) {
        return text.toLowerCase()
            .codePoints()
            .filter(c -> Character.isDigit(c) || Character.isAlphabetic(c))
            .collect(
                StringBuilder::new,
                StringBuilder::appendCodePoint,
                StringBuilder::append
            ).toString();
    }

    public String getNormalizedPlaintext() {
        return normalizedPlainText;
    }

    public int getSquareSize() {
        return squareSize;
    }

    public List<String> getPlaintextSegments() {
        List<String> segments = new ArrayList<>();
        for (int i = 0; i < normalizedPlainText.length(); i += squareSize) {
            segments.add(normalizedPlainText.substring(i, Math.min(i + squareSize, normalizedPlainText.length())));
        }
        return segments;
    }

    public String getCipherText() {
        List<String> segments = getPlaintextSegments();
        StringBuilder cipherText = new StringBuilder();
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
        int textLen = cipherText.length();
        List<String> normalizedSegments = new ArrayList<>();
        for (int i = 0; i < textLen; i += squareSize) {
            normalizedSegments.add(cipherText.substring(i, Math.min(i + squareSize, textLen)));
        }
        return String.join(" ", normalizedSegments);
    }
}