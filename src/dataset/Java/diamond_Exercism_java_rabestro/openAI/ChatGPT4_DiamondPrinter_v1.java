import java.util.ArrayList;
import java.util.List;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        int size = 2 * (targetLetter - 'A') + 1;
        List<String> result = new ArrayList<>(size);

        for (char c = 'A'; c <= targetLetter; c++) {
            result.add(createLine(c, targetLetter));
        }
        for (char c = (char) (targetLetter - 1); c >= 'A'; c--) {
            result.add(createLine(c, targetLetter));
        }

        return result;
    }

    private static String createLine(char currentLetter, char targetLetter) {
        int lineLength = 2 * (targetLetter - 'A') + 1;
        char[] line = new char[lineLength];
        int offset = targetLetter - currentLetter;

        for (int i = 0; i < lineLength; i++) {
            line[i] = (i == offset || i == lineLength - 1 - offset) ? currentLetter : ' ';
        }

        return new String(line);
    }
}