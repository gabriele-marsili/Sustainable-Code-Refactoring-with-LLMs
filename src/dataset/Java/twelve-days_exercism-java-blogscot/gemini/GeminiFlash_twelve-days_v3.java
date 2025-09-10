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

  private static final String DEFAULT_GIFT = "a Partridge in a Pear Tree";

  String verse(int verseNumber) {
    int num = verseNumber - 1;
    return createVerse(DAYS[num], getGifts(num));
  }

  String verses(int startVerse, int endVerse) {
    StringBuilder verses = new StringBuilder();
    for (int i = startVerse; i <= endVerse; i++) {
      verses.append(verse(i));
      if (i < endVerse) {
        verses.append('\n');
      }
    }
    return verses.toString();
  }

  String sing() {
    return verses(1, 12);
  }

  private static String createVerse(String day, String gifts) {
    return String.format("On the %s day of Christmas my true love gave to me: %s.\n", day, gifts);
  }

  private static String getGifts(int numGifts) {
    if (numGifts == 0) {
      return DEFAULT_GIFT;
    }

    StringBuilder giftsBuilder = new StringBuilder();
    for (int i = numGifts; i >= 0; i--) {
      giftsBuilder.append(GIFTS[i]);
      if (i > 0) {
        giftsBuilder.append(", ");
      }
    }
    return giftsBuilder.toString();
  }
}