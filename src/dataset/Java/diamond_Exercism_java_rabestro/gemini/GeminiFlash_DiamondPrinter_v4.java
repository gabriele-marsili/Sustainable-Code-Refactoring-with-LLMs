import java.util.ArrayList;
import java.util.List;

public final class DiamondPrinter {
    public static List<String> printToList(char targetLetter) {
        int diamondSize = 2 * (targetLetter - 'A') + 1;
        List<String> diamond = new ArrayList<>(diamondSize);

        for (char codePoint = 'A'; codePoint <= targetLetter; codePoint++) {
            char[] line = new char[diamondSize];
            java.util.Arrays.fill(line, ' ');
            int distanceFromA = codePoint - 'A';
            line[targetLetter - codePoint] = codePoint;
            line[diamondSize - 1 - (targetLetter - codePoint)] = codePoint;
            diamond.add(new String(line));
        }

        for (char codePoint = (char) (targetLetter - 1); codePoint >= 'A'; codePoint--) {
            char[] line = new char[diamondSize];
            java.util.Arrays.fill(line, ' ');
            int distanceFromA = codePoint - 'A';
            line[targetLetter - codePoint] = codePoint;
            line[diamondSize - 1 - (targetLetter - codePoint)] = codePoint;
            diamond.add(new String(line));
        }

        return diamond;
    }
}