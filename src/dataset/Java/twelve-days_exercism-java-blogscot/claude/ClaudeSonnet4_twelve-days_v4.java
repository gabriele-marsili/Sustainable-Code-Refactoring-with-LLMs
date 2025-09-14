import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

  private static final String[] CACHED_VERSES = new String[12];
  private static final String[] CACHED_GIFTS = new String[12];

  static {
    CACHED_GIFTS[0] = "a Partridge in a Pear Tree";
    for (int i = 1; i < 12; i++) {
      StringBuilder sb = new StringBuilder();
      for (int j = i; j >= 0; j--) {
        if (sb.length() > 0) sb.append(", ");
        sb.append(GIFTS[j]);
      }
      CACHED_GIFTS[i] = sb.toString();
    }
    
    for (int i = 0; i < 12; i++) {
      CACHED_VERSES[i] = "On the " + DAYS[i] + " day of Christmas my true love gave to me: " + CACHED_GIFTS[i] + ".\n";
    }
  }

  private static String createVerse(String day, String gifts) {
    return "On the " + day + " day of Christmas my true love gave to me: " + gifts + ".\n";
  }

  private static String getGifts(int numGifts) {
    return CACHED_GIFTS[numGifts];
  }

  String verse(int verseNumber) {
    return CACHED_VERSES[verseNumber - 1];
  }

  String verses(int startVerse, int endVerse) {
    if (startVerse == 1 && endVerse == 12) {
      return sing();
    }
    
    StringBuilder sb = new StringBuilder();
    for (int i = startVerse; i <= endVerse; i++) {
      if (sb.length() > 0) sb.append("\n");
      sb.append(CACHED_VERSES[i - 1]);
    }
    return sb.toString();
  }

  String sing() {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 12; i++) {
      if (i > 0) sb.append("\n");
      sb.append(CACHED_VERSES[i]);
    }
    return sb.toString();
  }
}