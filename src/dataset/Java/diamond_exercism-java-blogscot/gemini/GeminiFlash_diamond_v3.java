import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    int lineWidth = getLineWidth(chr);
    List<String> output = new ArrayList<>(lineWidth / 2 + 1);

    int start = lineWidth / 2;
    int left = start;
    int right = start;
    char letter = 'A';

    StringBuilder lineBuilder = new StringBuilder(lineWidth);

    while (left >= 0) {
      lineBuilder.setLength(0);
      for (int i = 0; i < lineWidth; i++) {
        lineBuilder.append(' ');
      }
      lineBuilder.setCharAt(left--, letter);
      if (letter != 'A') {
        lineBuilder.setCharAt(right++, letter);
      }
      output.add(lineBuilder.toString());
      letter++;
    }

    letter -= 2;
    left = 1;
    right = lineWidth - 2;

    while (left <= start) {
      lineBuilder.setLength(0);
      for (int i = 0; i < lineWidth; i++) {
        lineBuilder.append(' ');
      }
      lineBuilder.setCharAt(left++, letter);
      lineBuilder.setCharAt(right--, letter);
      output.add(lineBuilder.toString());
      letter--;
    }

    return output;
  }

  private int getLineWidth(char letter) {
    return 1 + 2 * (letter - 'A');
  }
}