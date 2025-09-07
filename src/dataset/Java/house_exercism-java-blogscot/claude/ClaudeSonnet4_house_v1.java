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

  private static final String[] cachedVerses = new String[13];
  
  static {
    cachedVerses[1] = firstVerse;
    for (int num = 2; num <= 12; num++) {
      StringBuilder builder = new StringBuilder(200);
      builder.append("This is the ").append(items[num - 2]).append(' ');
      
      for (int i = num - 2; i > 0; i--) {
        builder.append("that ").append(actions[i - 1]).append(" the ").append(items[i - 1]).append(' ');
      }
      builder.append(lastVerse);
      cachedVerses[num] = builder.toString();
    }
  }

  String verse(int num) {
    return cachedVerses[num];
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