import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    var output = new ArrayList<String>();
    var lineWidth = getLineWidth(chr);
    int halfWidth = lineWidth / 2;

    // Build upper half (including middle)
    for (int i = 0; i <= halfWidth; i++) {
      char letter = (char) ('A' + i);
      output.add(buildLine(lineWidth, halfWidth - i, letter));
    }

    // Build lower half (excluding middle)
    for (int i = halfWidth - 1; i >= 0; i--) {
      char letter = (char) ('A' + i);
      output.add(buildLine(lineWidth, halfWidth - i, letter));
    }

    return output;
  }

  private String buildLine(int lineWidth, int padding, char letter) {
    var line = new char[lineWidth];
    
    // Fill with spaces
    for (int i = 0; i < lineWidth; i++) {
      line[i] = ' ';
    }
    
    // Place letters
    line[padding] = letter;
    if (padding != lineWidth - 1 - padding) {
      line[lineWidth - 1 - padding] = letter;
    }
    
    return new String(line);
  }

  private int getLineWidth(char letter) {
    return 1 + 2 * (letter - 'A');
  }

  private char[] getNewLine(int lineWidth) {
    var line = new char[lineWidth];
    for (int i = 0; i < lineWidth; i++) {
      line[i] = ' ';
    }
    return line;
  }
}