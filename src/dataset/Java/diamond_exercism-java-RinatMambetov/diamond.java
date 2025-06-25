import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

    List<String> printToList(char a) {
        int letterNumber = a - 'A';
        List<String> result = new ArrayList<>();
        for (int lineNumber = 0; lineNumber <= letterNumber; lineNumber++) {
            StringBuilder line = new StringBuilder();
            int leftRightSpaces = letterNumber - lineNumber;
            int centerSpaces;
            if (lineNumber == 0 || lineNumber == 1) {
                centerSpaces = lineNumber;
            } else {
                centerSpaces = lineNumber + lineNumber - 1;
            }
            line = fillZeros(line, leftRightSpaces);
            line.append((char) ('A' + lineNumber));
            line = fillZeros(line, centerSpaces);
            if (lineNumber > 0) {
                line.append((char) ('A' + lineNumber));
            }
            line = fillZeros(line, leftRightSpaces);
            result.add(line.toString());
        }
        for (int line = result.size() - 2; line >= 0; line--) {
            result.add(result.get(line));
        }
        return result;
    }

    StringBuilder fillZeros(StringBuilder strBuilder, int count) {
        while (count > 0) {
            strBuilder.append(" ");
            count--;
        }
        return strBuilder;
    }
}
