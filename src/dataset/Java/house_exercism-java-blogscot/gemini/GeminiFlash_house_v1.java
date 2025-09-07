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

  private static final String[] VERSES = new String[12];

  static {
    VERSES[0] = FIRST_VERSE;
    for (int i = 1; i < 12; i++) {
      VERSES[i] = buildVerse(i + 1);
    }
  }

  private static String buildVerse(int num) {
    StringBuilder builder = new StringBuilder();
    builder.append("This is the ").append(ITEMS[num - 2]).append(" ");

    for (int i = num - 2; i > 0; i--) {
      builder.append("that ").append(ACTIONS[i - 1]).append(" the ").append(ITEMS[i - 1]).append(" ");
    }
    builder.append(LAST_VERSE);
    return builder.toString();
  }

  String verse(int num) {
    return VERSES[num - 1];
  }

  String verses(int startVerse, int endVerse) {
    StringBuilder builder = new StringBuilder();
    for (int i = startVerse - 1; i < endVerse; i++) {
      builder.append(VERSES[i]);
      if (i < endVerse - 1) {
        builder.append("\n");
      }
    }
    return builder.toString();
  }

  String sing() {
    return verses(1, 12);
  }
}