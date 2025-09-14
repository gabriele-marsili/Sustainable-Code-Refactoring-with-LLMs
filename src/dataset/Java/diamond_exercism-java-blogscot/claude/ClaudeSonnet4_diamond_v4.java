import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    int letterIndex = chr - 'A';
    int lineWidth = 1 + 2 * letterIndex;
    int totalLines = 2 * letterIndex + 1;
    
    var output = new ArrayList<String>(totalLines);
    
    // Upper half including middle
    for (int i = 0; i <= letterIndex; i++) {
      char currentLetter = (char) ('A' + i);
      output.add(buildLine(lineWidth, letterIndex - i, currentLetter));
    }
    
    // Lower half
    for (int i = letterIndex - 1; i >= 0; i--) {
      char currentLetter = (char) ('A' + i);
      output.add(buildLine(lineWidth, letterIndex - i, currentLetter));
    }
    
    return output;
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
  
  private String buildLine(int lineWidth, int spaces, char letter) {
    var line = new char[lineWidth];
    for (int i = 0; i < lineWidth; i++) {
      line[i] = ' ';
    }
    
    line[spaces] = letter;
    if (letter != 'A') {
      line[lineWidth - 1 - spaces] = letter;
    }
    
    return new String(line);
  }
}