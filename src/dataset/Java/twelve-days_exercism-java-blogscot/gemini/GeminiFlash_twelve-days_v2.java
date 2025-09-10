class TwelveDays {

  private static final String[] DAYS = {
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

  private static final String[] GIFTS = {
      "a Partridge in a Pear Tree",
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

  String verse(int verseNumber) {
    int num = verseNumber - 1;
    StringBuilder verseText = new StringBuilder("On the ");
    verseText.append(DAYS[num]).append(" day of Christmas my true love gave to me: ");

    if (num == 0) {
      verseText.append(GIFTS[0]).append(".\n");
    } else {
      for (int i = num; i > 0; i--) {
        verseText.append(GIFTS[i]).append(", ");
      }
      verseText.append("and ").append(GIFTS[0]).append(".\n");
    }

    return verseText.toString();
  }

  String verses(int startVerse, int endVerse) {
    StringBuilder versesText = new StringBuilder();
    for (int i = startVerse; i <= endVerse; i++) {
      versesText.append(verse(i));
      if (i < endVerse) {
        versesText.append("\n");
      }
    }
    return versesText.toString();
  }

  String sing() {
    return verses(1, 12);
  }
}