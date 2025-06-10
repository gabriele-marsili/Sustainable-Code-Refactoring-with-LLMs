import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class House {

  private static final String firstVerse = "This is the house that Jack built.";
  private static final String lastVerse = "that lay in the house that Jack built.";

  private static final String[] items = {
      "malt",
      "rat",
      "cat",
      "dog",
      "cow with the crumpled horn",
      "maiden all forlorn",
      "man all tattered and torn",
      "priest all shaven and shorn",
      "rooster that crowed in the morn",
      "farmer sowing his corn",
      "horse and the hound and the horn"
  };

  private static final String[] actions = {
      "ate",
      "killed",
      "worried",
      "tossed",
      "milked",
      "kissed",
      "married",
      "woke",
      "kept",
      "belonged to"
  };

  String verse(int num) {
    if (num == 1) return firstVerse;
    var builder = new StringBuilder();

    builder.append(String.format("This is the %s ", items[num - 2]));

    for (int i = num - 2; i > 0; i--) {
      builder.append(String.format("that %s the %s ", actions[i - 1], items[i - 1]));
    }
    builder.append(lastVerse);
    return builder.toString();
  }

  String verses(int startVerse, int endVerse) {
    return IntStream
        .rangeClosed(startVerse, endVerse)
        .mapToObj(this::verse)
        .collect(Collectors.joining("\n"));
  }

  String sing() {
    return verses(1, 12);
  }
}
