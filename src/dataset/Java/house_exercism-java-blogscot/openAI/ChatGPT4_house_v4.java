import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class House {

  private static final String FIRST_VERSE = "This is the house that Jack built.";
  private static final String LAST_VERSE = "that lay in the house that Jack built.";

  private static final String[] ITEMS = {
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

  private static final String[] ACTIONS = {
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

  private static final String[] VERSES_CACHE = generateVersesCache();

  private static String[] generateVersesCache() {
    String[] cache = new String[12];
    cache[0] = FIRST_VERSE;
    for (int i = 1; i < 12; i++) {
      StringBuilder builder = new StringBuilder("This is the ").append(ITEMS[i - 1]).append(" ");
      for (int j = i - 1; j > 0; j--) {
        builder.append("that ").append(ACTIONS[j - 1]).append(" the ").append(ITEMS[j - 1]).append(" ");
      }
      builder.append(LAST_VERSE);
      cache[i] = builder.toString();
    }
    return cache;
  }

  String verse(int num) {
    return VERSES_CACHE[num - 1];
  }

  String verses(int startVerse, int endVerse) {
    return IntStream.rangeClosed(startVerse, endVerse)
        .mapToObj(i -> VERSES_CACHE[i - 1])
        .collect(Collectors.joining("\n"));
  }

  String sing() {
    return String.join("\n", VERSES_CACHE);
  }
}