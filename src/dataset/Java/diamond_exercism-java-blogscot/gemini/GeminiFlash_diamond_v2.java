import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    int letterIndex = chr - 'A';
    int lineWidth = 1 + 2 * letterIndex;
    int halfWidth = lineWidth / 2;

    List<String> output = new ArrayList<>(lineWidth); // Pre-allocate list size
    char[] line = new char[lineWidth];

    // Upper half
    for (int i = 0; i <= letterIndex; i++) {
      java.util.Arrays.fill(line, ' '); // Use fully qualified name to avoid potential conflicts
      char currentLetter = (char) ('A' + i);
      line[halfWidth - i] = currentLetter;
      line[halfWidth + i] = currentLetter;
      output.add(new String(line)); // Create String only once
    }

    // Lower half
    for (int i = letterIndex - 1; i >= 0; i--) {
      java.util.Arrays.fill(line, ' ');
      char currentLetter = (char) ('A' + i);
      line[halfWidth - i] = currentLetter;
      line[halfWidth + i] = currentLetter;
      output.add(new String(line));
    }

    return output;
  }
}