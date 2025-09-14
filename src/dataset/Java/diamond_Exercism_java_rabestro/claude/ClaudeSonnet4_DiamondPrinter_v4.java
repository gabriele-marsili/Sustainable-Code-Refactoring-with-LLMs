import java.util.ArrayList;
import java.util.List;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        int size = targetLetter - 'A' + 1;
        int lineLength = 2 * size - 1;
        List<String> result = new ArrayList<>(2 * size - 1);
        
        char[] line = new char[lineLength];
        
        // Forward sequence (A to target)
        for (int i = 0; i < size; i++) {
            char currentChar = (char) ('A' + i);
            java.util.Arrays.fill(line, ' ');
            line[size - 1 - i] = currentChar;
            line[size - 1 + i] = currentChar;
            result.add(new String(line));
        }
        
        // Backward sequence (target-1 to A)
        for (int i = size - 2; i >= 0; i--) {
            char currentChar = (char) ('A' + i);
            java.util.Arrays.fill(line, ' ');
            line[size - 1 - i] = currentChar;
            line[size - 1 + i] = currentChar;
            result.add(new String(line));
        }
        
        return result;
    }
}