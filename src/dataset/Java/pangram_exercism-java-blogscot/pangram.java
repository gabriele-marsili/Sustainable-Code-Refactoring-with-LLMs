import java.util.stream.IntStream;

class PangramChecker {

  boolean isPangram(String input) {
    var text = input.toLowerCase();
    return IntStream.rangeClosed('a', 'z').allMatch(letter -> text.indexOf(letter) != -1);
  }

}
