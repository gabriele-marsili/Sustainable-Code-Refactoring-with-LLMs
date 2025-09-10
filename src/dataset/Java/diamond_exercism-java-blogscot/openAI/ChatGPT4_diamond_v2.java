import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    int lineWidth = getLineWidth(chr);
    int start = lineWidth / 2;
    List<String> output = new ArrayList<>(lineWidth);

    for (int i = 0; i <= start; i++) {
      output.add(buildLine(lineWidth, start - i, (char) ('A' + i)));
    }

    for (int i = start - 1; i >= 0; i--) {
      output.add(output.get(i));
    }

    return output;
  }

  private int getLineWidth(char letter) {
    return 1 + 2 * (letter - 'A');
  }

  private String buildLine(int lineWidth, int offset, char letter) {
    char[] line = new char[lineWidth];
    for (int i = 0; i < lineWidth; i++) {
      line[i] = (i == offset || i == lineWidth - offset - 1) ? letter : ' ';
    }
    return new String(line);
  }
}