import java.util.List;
import java.util.ArrayList;

public class Crypto {
    private final String plainText;
    private String normalizedPlaintext;
    private int squareSize;
    private List<String> plaintextSegments;

    public Crypto(String plainText) {
        this.plainText = plainText;
    }

    public String getNormalizedPlaintext() {
        if (normalizedPlaintext == null) {
            StringBuilder sb = new StringBuilder(plainText.length());
            for (int i = 0; i < plainText.length(); i++) {
                char c = Character.toLowerCase(plainText.charAt(i));
                if (Character.isDigit(c) || Character.isAlphabetic(c)) {
                    sb.append(c);
                }
            }
            normalizedPlaintext = sb.toString();
        }
        return normalizedPlaintext;
    }

    public int getSquareSize() {
        if (squareSize == 0) {
            squareSize = (int)Math.sqrt(getNormalizedPlaintext().length() - 1) + 1;
        }
        return squareSize;
    }

    public List<String> getPlaintextSegments() {
        if (plaintextSegments == null) {
            plaintextSegments = new ArrayList<>();
            int size = getSquareSize();
            String normalized = getNormalizedPlaintext();
            int length = normalized.length();
            
            for (int i = 0; i < length; i += size) {
                int end = Math.min(i + size, length);
                plaintextSegments.add(normalized.substring(i, end));
            }
        }
        return plaintextSegments;
    }

    public String getCipherText() {
        StringBuilder cipherText = new StringBuilder();
        List<String> segments = getPlaintextSegments();
        int size = getSquareSize();
        
        for (int column = 0; column < size; column++) {
            for (int row = 0; row < segments.size(); row++) {
                String segment = segments.get(row);
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
        int size = getSquareSize() - 1;
        
        if (size <= 0 || textLen <= size) {
            return cipherText;
        }
        
        StringBuilder normCipherText = new StringBuilder();
        normCipherText.append(cipherText, 0, size);
        
        for (int i = size; i < textLen; i += size) {
            if ((textLen - i) % size != 0 && (textLen - i) % (size - 1) == 0) {
                size--;
            }
            normCipherText.append(" ");
            int end = Math.min(i + size, textLen);
            normCipherText.append(cipherText, i, end);
        }
        return normCipherText.toString();
    }
}