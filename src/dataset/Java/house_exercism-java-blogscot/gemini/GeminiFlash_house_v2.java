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

  String verse(int num) {
    if (num == 1) {
      return FIRST_VERSE;
    }

    StringBuilder builder = new StringBuilder("This is the ");
    builder.append(ITEMS[num - 2]).append(" ");

    for (int i = num - 2; i > 0; i--) {
      builder.append("that ").append(ACTIONS[i - 1]).append(" the ").append(ITEMS[i - 1]).append(" ");
    }

    builder.append(LAST_VERSE);
    return builder.toString();
  }

  String verses(int startVerse, int endVerse) {
    StringBuilder result = new StringBuilder();
    for (int i = startVerse; i <= endVerse; i++) {
      result.append(verse(i));
      if (i < endVerse) {
        result.append("\n");
      }
    }
    return result.toString();
  }

  String sing() {
    return verses(1, 12);
  }
}