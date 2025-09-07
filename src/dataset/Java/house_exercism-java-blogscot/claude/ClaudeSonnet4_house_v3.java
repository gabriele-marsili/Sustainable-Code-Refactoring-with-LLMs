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

  private static final String[] CACHED_VERSES = new String[13];
  
  static {
    for (int i = 1; i <= 12; i++) {
      CACHED_VERSES[i] = buildVerse(i);
    }
  }

  private static String buildVerse(int num) {
    if (num == 1) return FIRST_VERSE;
    
    StringBuilder builder = new StringBuilder(200);
    builder.append("This is the ").append(ITEMS[num - 2]).append(' ');

    for (int i = num - 2; i > 0; i--) {
      builder.append("that ").append(ACTIONS[i - 1]).append(" the ").append(ITEMS[i - 1]).append(' ');
    }
    builder.append(LAST_VERSE);
    return builder.toString();
  }

  String verse(int num) {
    return CACHED_VERSES[num];
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