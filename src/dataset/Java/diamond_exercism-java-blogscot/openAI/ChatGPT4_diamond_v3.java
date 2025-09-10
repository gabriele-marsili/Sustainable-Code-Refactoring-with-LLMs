import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    int lineWidth = 1 + 2 * (chr - 'A');
    int mid = lineWidth / 2;
    List<String> output = new ArrayList<>(lineWidth);

    for (int i = 0; i <= mid; i++) {
      output.add(buildLine(lineWidth, mid - i, (char) ('A' + i)));
    }

    for (int i = mid - 1; i >= 0; i--) {
      output.add(output.get(i));
    }

    return output;
  }

  private String buildLine(int lineWidth, int offset, char letter) {
    char[] line = new char[lineWidth];
    for (int i = 0; i < lineWidth; i++) {
      line[i] = (i == offset || i == lineWidth - offset - 1) ? letter : ' ';
    }
    return new String(line);
  }
}