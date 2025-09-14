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
      "and a Partridge in a Pear Tree",
      "two Turtle Doves",
      "three French Hens",
      "four Calling Birds",
      "five Gold Rings",
      "six Geese-a-Laying",
      "seven Swans-a-Swimming",
      "eight Maids-a-Milking",
      "nine Ladies Dancing",
      "ten Lords-a-Leaping",
      "eleven Pipers Piping",
      "twelve Drummers Drumming"};

  private static final String[] precomputedVerses = new String[12];
  
  static {
    for (int i = 0; i < 12; i++) {
      precomputedVerses[i] = createVerse(days[i], getGifts(i));
    }
  }

  private static String createVerse(String day, String gifts) {
    return "On the " + day + " day of Christmas my true love gave to me: " + gifts + ".\n";
  }

  private static String getGifts(int numGifts) {
    if (numGifts == 0) return "a Partridge in a Pear Tree";

    StringBuilder sb = new StringBuilder();
    for (int i = numGifts; i >= 0; i--) {
      if (sb.length() > 0) sb.append(", ");
      sb.append(gifts[i]);
    }
    return sb.toString();
  }

  String verse(int verseNumber) {
    return precomputedVerses[verseNumber - 1];
  }

  String verses(int startVerse, int endVerse) {
    StringBuilder sb = new StringBuilder();
    for (int i = startVerse; i <= endVerse; i++) {
      if (sb.length() > 0) sb.append("\n");
      sb.append(verse(i));
    }
    return sb.toString();
  }

  String sing() {
    return verses(1, 12);
  }
}