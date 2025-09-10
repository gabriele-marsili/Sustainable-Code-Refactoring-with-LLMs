import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    int lineWidth = getLineWidth(chr);
    int start = lineWidth / 2;
    List<String> output = new ArrayList<>(lineWidth);

    char[] line = new char[lineWidth];
    for (int i = 0; i < lineWidth; i++) {
      line[i] = ' ';
    }

    for (int i = 0, left = start, right = start; left >= 0; i++, left--, right++) {
      line[left] = line[right] = (char) ('A' + i);
      output.add(new String(line));
    }

    for (int i = lineWidth / 2 - 1, left = start - 1, right = start + 1; left >= 0; i--, left++, right--) {
      line[left] = line[right] = ' ';
      output.add(new String(line));
    }

    return output;
  }

  private int getLineWidth(char letter) {
    return 1 + 2 * (letter - 'A');
  }
}