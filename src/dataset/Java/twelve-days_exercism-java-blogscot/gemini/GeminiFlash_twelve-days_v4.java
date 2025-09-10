class TwelveDays {

  private static final String[] days = {
      "first",
      "second",
      "third",
      "fourth",
      "fifth",
      "sixth",
      "seventh",
      "eighth",
      "ninth",
      "tenth",
      "eleventh",
      "twelfth"};

  private static final String[] gifts = {
      "twelve Drummers Drumming",
      "eleven Pipers Piping",
      "ten Lords-a-Leaping",
      "nine Ladies Dancing",
      "eight Maids-a-Milking",
      "seven Swans-a-Swimming",
      "six Geese-a-Laying",
      "five Gold Rings",
      "four Calling Birds",
      "three French Hens",
      "two Turtle Doves",
      "and a Partridge in a Pear Tree"};

  private static final String[] versesCache = new String[12];

  static {
    for (int i = 0; i < 12; i++) {
      versesCache[i] = createVerse(i);
    }
  }

  private static String createVerse(int verseNumber) {
    StringBuilder verse = new StringBuilder();
    verse.append("On the ").append(days[verseNumber]).append(" day of Christmas my true love gave to me: ");

    for (int i = verseNumber; i > 0; i--) {
      verse.append(gifts[12 - i]).append(", ");
    }
    verse.append(gifts[11]).append(".\n");

    return verse.toString();
  }

  String verse(int verseNumber) {
    return versesCache[verseNumber - 1];
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