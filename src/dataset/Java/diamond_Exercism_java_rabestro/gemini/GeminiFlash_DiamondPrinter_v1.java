import java.util.ArrayList;
import java.util.List;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        int diamondSize = 2 * (targetLetter - 'A') + 1;
        List<String> diamond = new ArrayList<>(targetLetter - 'A' + targetLetter - 'A' + 1);

        for (char codePoint = 'A'; codePoint <= targetLetter; codePoint++) {
            char[] line = new char[diamondSize];
            java.util.Arrays.fill(line, ' ');
            int index = targetLetter - codePoint;
            line[index] = codePoint;
            line[diamondSize - 1 - index] = codePoint;
            diamond.add(new String(line));
        }

        for (char codePoint = (char) (targetLetter - 1); codePoint >= 'A'; codePoint--) {
            char[] line = new char[diamondSize];
            java.util.Arrays.fill(line, ' ');
            int index = targetLetter - codePoint;
            line[index] = codePoint;
            line[diamondSize - 1 - index] = codePoint;
            diamond.add(new String(line));
        }

        return diamond;
    }
}