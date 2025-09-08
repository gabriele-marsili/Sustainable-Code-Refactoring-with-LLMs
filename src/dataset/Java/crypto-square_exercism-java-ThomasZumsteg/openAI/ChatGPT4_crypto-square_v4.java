import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class Crypto {
    private final String plainText;

    public Crypto(String plainText) {
        this.plainText = plainText;
    }

    public String getNormalizedPlaintext() {
        return plainText.toLowerCase()
            .chars()
            .filter(c -> Character.isDigit(c) || Character.isAlphabetic(c))
            .mapToObj(c -> String.valueOf((char) c))
            .collect(Collectors.joining());
    }

    public int getSquareSize() {
        int length = getNormalizedPlaintext().length();
        return (int) Math.ceil(Math.sqrt(length));
    }

    public List<String> getPlaintextSegments() {
        String normalizedPlaintext = getNormalizedPlaintext();
        int size = getSquareSize();
        int length = normalizedPlaintext.length();
        List<String> segments = new ArrayList<>((length + size - 1) / size);
        for (int i = 0; i < length; i += size) {
            segments.add(normalizedPlaintext.substring(i, Math.min(i + size, length)));
        }
        return segments;
    }

    public String getCipherText() {
        List<String> segments = getPlaintextSegments();
        int size = getSquareSize();
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
        StringBuilder normCipherText = new StringBuilder();
        for (int i = 0; i < cipherText.length(); i += size) {
            if (normCipherText.length() > 0) {
                normCipherText.append(" ");
            }
            normCipherText.append(cipherText, i, Math.min(i + size, cipherText.length()));
        }
        return normCipherText.toString();
    }
}