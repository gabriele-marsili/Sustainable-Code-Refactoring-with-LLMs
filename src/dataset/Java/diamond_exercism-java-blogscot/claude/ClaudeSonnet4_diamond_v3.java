import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    var output = new ArrayList<String>();
    var lineWidth = getLineWidth(chr);
    var halfWidth = lineWidth / 2;
    
    // Pre-allocate StringBuilder to avoid string concatenation overhead
    var sb = new StringBuilder(lineWidth);
    
    // Upper half including middle
    for (int i = 0; i <= halfWidth; i++) {
      char currentLetter = (char) ('A' + i);
      sb.setLength(0);
      
      // Left padding
      for (int j = 0; j < halfWidth - i; j++) {
        sb.append(' ');
      }
      
      // First letter
      sb.append(currentLetter);
      
      // Middle spacing and second letter (if not 'A')
      if (currentLetter != 'A') {
        for (int j = 0; j < 2 * i - 1; j++) {
          sb.append(' ');
        }
        sb.append(currentLetter);
      }
      
      // Right padding
      for (int j = 0; j < halfWidth - i; j++) {
        sb.append(' ');
      }
      
      output.add(sb.toString());
    }
    
    // Lower half (mirror of upper half excluding middle)
    for (int i = halfWidth - 1; i >= 0; i--) {
      char currentLetter = (char) ('A' + i);
      sb.setLength(0);
      
      // Left padding
      for (int j = 0; j < halfWidth - i; j++) {
        sb.append(' ');
      }
      
      // First letter
      sb.append(currentLetter);
      
      // Middle spacing and second letter (if not 'A')
      if (currentLetter != 'A') {
        for (int j = 0; j < 2 * i - 1; j++) {
          sb.append(' ');
        }
        sb.append(currentLetter);
      }
      
      // Right padding
      for (int j = 0; j < halfWidth - i; j++) {
        sb.append(' ');
      }
      
      output.add(sb.toString());
    }
    
    return output;
  }

  private int getLineWidth(char letter) {
    return 1 + 2 * (letter - 'A');
  }

  private char[] getNewLine(int lineWidth) {
    var line = new char[lineWidth];
    java.util.Arrays.fill(line, ' ');
    return line;
  }
}