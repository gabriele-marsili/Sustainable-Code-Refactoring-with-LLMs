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
            StringBuilder sb = new StringBuilder();
            String lowerCaseText = plainText.toLowerCase();
            for (int i = 0; i < lowerCaseText.length(); i++) {
                char c = lowerCaseText.charAt(i);
                if (Character.isDigit(c) || Character.isLetter(c)) {
                    sb.append(c);
                }
            }
            normalizedPlaintext = sb.toString();
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
        int len = normalizedPlaintext.length();
        for (int i = 0; i < len; i += size) {
            segments.add(normalizedPlaintext.substring(i, Math.min(i + size, len)));
        }
        return segments;
    }

    public String getCipherText() {
        StringBuilder cipherText = new StringBuilder();
        List<String> segments = getPlaintextSegments();
        int square = getSquareSize();
        for (int column = 0; column < square; column++) {
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
        int size = getSquareSize();
        int cipherTextLength = cipherText.length();

        for (int i = 0; i < cipherTextLength; i += size) {
            int end = Math.min(i + size, cipherTextLength);
            normalizedCipherText.append(cipherText, i, end);
            if (end < cipherTextLength) {
                normalizedCipherText.append(" ");
            }
        }

        return normalizedCipherText.toString();
    }
}