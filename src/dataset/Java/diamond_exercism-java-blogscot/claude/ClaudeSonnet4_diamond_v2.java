import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    var output = new ArrayList<String>();
    var lineWidth = getLineWidth(chr);
    var halfWidth = lineWidth / 2;

    // Pre-allocate StringBuilder with exact capacity
    var sb = new StringBuilder(lineWidth);
    
    // Upper half including middle
    for (int i = 0; i <= halfWidth; i++) {
      char letter = (char) ('A' + i);
      buildLine(sb, lineWidth, halfWidth - i, letter);
      output.add(sb.toString());
      sb.setLength(0);
    }

    // Lower half (mirror upper half excluding middle)
    for (int i = halfWidth - 1; i >= 0; i--) {
      char letter = (char) ('A' + i);
      buildLine(sb, lineWidth, halfWidth - i, letter);
      output.add(sb.toString());
      sb.setLength(0);
    }
    
    return output;
  }

  private void buildLine(StringBuilder sb, int lineWidth, int padding, char letter) {
    // Add left padding
    for (int i = 0; i < padding; i++) {
      sb.append(' ');
    }
    
    // Add first letter
    sb.append(letter);
    
    // Add middle spaces and second letter (if not 'A')
    if (letter != 'A') {
      int middleSpaces = lineWidth - 2 * padding - 2;
      for (int i = 0; i < middleSpaces; i++) {
        sb.append(' ');
      }
      sb.append(letter);
    }
    
    // Add right padding
    for (int i = 0; i < padding; i++) {
      sb.append(' ');
    }
  }

  private int getLineWidth(char letter) {
    return 1 + 2 * (letter - 'A');
  }
}