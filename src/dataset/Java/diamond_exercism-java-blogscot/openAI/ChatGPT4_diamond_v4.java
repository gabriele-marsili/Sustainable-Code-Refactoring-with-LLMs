import java.util.ArrayList;
import java.util.List;

class DiamondPrinter {

  List<String> printToList(char chr) {
    int lineWidth = 1 + 2 * (chr - 'A');
    int mid = lineWidth / 2;
    List<String> output = new ArrayList<>(lineWidth);

    char[] line = new char[lineWidth];
    for (int i = 0; i < lineWidth; i++) line[i] = ' ';

    for (int i = 0; i <= mid; i++) {
      line[mid - i] = line[mid + i] = (char) ('A' + i);
      output.add(new String(line));
    }

    for (int i = mid - 1; i >= 0; i--) {
      output.add(output.get(i));
    }

    return output;
  }
}