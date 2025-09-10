import java.util.ArrayList;
import java.util.List;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        int size = 2 * (targetLetter - 'A') + 1;
        List<String> result = new ArrayList<>(size);
        char[] line = new char[size];
        for (int i = 0; i < size; i++) line[i] = ' ';

        for (char c = 'A'; c <= targetLetter; c++) {
            int index = targetLetter - c;
            line[index] = c;
            line[size - 1 - index] = c;
            result.add(new String(line));
            line[index] = ' ';
            line[size - 1 - index] = ' ';
        }

        for (char c = (char) (targetLetter - 1); c >= 'A'; c--) {
            int index = targetLetter - c;
            line[index] = c;
            line[size - 1 - index] = c;
            result.add(new String(line));
            line[index] = ' ';
            line[size - 1 - index] = ' ';
        }

        return result;
    }
}