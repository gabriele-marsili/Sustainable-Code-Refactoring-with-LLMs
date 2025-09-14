import java.util.StringJoiner;

class TwelveDays {

  private static final String[] days = {
      "first", "second", "third", "fourth", "fifth", "sixth",
      "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"};

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

  private static String createVerse(String day, String gifts) {
    return "On the " + day + " day of Christmas my true love gave to me: " + gifts + ".\n";
  }

  private static String getGifts(int numGifts) {
    if (numGifts == 0) return "a Partridge in a Pear Tree";
    StringJoiner joiner = new StringJoiner(", ");
    for (int i = numGifts; i >= 0; i--) {
      joiner.add(gifts[i]);
    }
    return joiner.toString();
  }

  String verse(int verseNumber) {
    int num = verseNumber - 1;
    return createVerse(days[num], getGifts(num));
  }

  String verses(int startVerse, int endVerse) {
    StringBuilder sb = new StringBuilder();
    for (int i = startVerse; i <= endVerse; i++) {
      sb.append(verse(i));
      if (i < endVerse) sb.append("\n");
    }
    return sb.toString();
  }

  String sing() {
    return verses(1, 12);
  }
}
