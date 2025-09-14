import java.util.ArrayList;
import java.util.List;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        int size = targetLetter - 'A';
        int lineLength = 2 * size + 1;
        List<String> result = new ArrayList<>(2 * size + 1);
        
        // Pre-allocate char array once and reuse
        char[] line = new char[lineLength];
        
        // Forward sequence (A to targetLetter)
        for (int i = 0; i <= size; i++) {
            char currentChar = (char) ('A' + i);
            java.util.Arrays.fill(line, ' ');
            line[size - i] = currentChar;
            line[size + i] = currentChar;
            result.add(new String(line));
        }
        
        // Backward sequence (targetLetter-1 to A)
        for (int i = size - 1; i >= 0; i--) {
            char currentChar = (char) ('A' + i);
            java.util.Arrays.fill(line, ' ');
            line[size - i] = currentChar;
            line[size + i] = currentChar;
            result.add(new String(line));
        }
        
        return result;
    }
}