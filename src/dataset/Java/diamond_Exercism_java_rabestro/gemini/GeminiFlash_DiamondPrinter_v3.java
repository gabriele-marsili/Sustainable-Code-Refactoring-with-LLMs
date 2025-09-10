import java.util.ArrayList;
import java.util.List;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        int width = 2 * (targetLetter - 'A') + 1;
        List<String> result = new ArrayList<>();

        for (char codePoint = 'A'; codePoint <= targetLetter; codePoint++) {
            char[] line = new char[width];
            java.util.Arrays.fill(line, ' ');
            int index = targetLetter - codePoint;
            line[index] = codePoint;
            line[width - 1 - index] = codePoint;
            result.add(new String(line));
        }

        for (char codePoint = (char) (targetLetter - 1); codePoint >= 'A'; codePoint--) {
            char[] line = new char[width];
            java.util.Arrays.fill(line, ' ');
            int index = targetLetter - codePoint;
            line[index] = codePoint;
            line[width - 1 - index] = codePoint;
            result.add(new String(line));
        }

        return result;
    }
}