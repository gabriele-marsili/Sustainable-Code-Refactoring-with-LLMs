import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    var output = new ArrayList<String>();
    var lineWidth = getLineWidth(chr);

    int start = lineWidth / 2;
    var left = start;
    var right = start;
    var letter = 'A';

    while (left >= 0) {
      var newLine = getNewLine(lineWidth);
      newLine[left--] = letter;
      newLine[right++] = letter++;
      output.add(String.valueOf(newLine));
    }

    // Don't repeat middle line
    left++;
    right--;
    letter--;

    while (left < start) {
      var newLine = getNewLine(lineWidth);
      newLine[++left] = --letter;
      newLine[--right] = letter;
      output.add(String.valueOf(newLine));
    }
    return output;
  }

  private int getLineWidth(char letter) {
    return 1 + 2 * (letter - 'A');
  }

  private char[] getNewLine(int lineWidth) {
    var line = new char[lineWidth];
    Arrays.fill(line, ' ');
    return line;
  }
}
