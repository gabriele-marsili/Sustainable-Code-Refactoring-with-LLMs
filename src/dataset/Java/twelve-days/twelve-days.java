import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

  private static String createVerse(String day, String gifts) {
    return String.format("On the %s day of Christmas my true love gave to me: %s.\n", day, gifts);
  }

  private static String getGifts(int numGifts) {
    if (numGifts == 0) return "a Partridge in a Pear Tree";

    return IntStream.rangeClosed(0, numGifts)
        .map(i -> numGifts - i) // count downTo
        .mapToObj(i -> gifts[i])
        .collect(Collectors.joining(", "));
  }

  String verse(int verseNumber) {
    var num = verseNumber - 1;
    return createVerse(days[num], getGifts(num));
  }

  String verses(int startVerse, int endVerse) {
    return IntStream.rangeClosed(startVerse, endVerse)
        .mapToObj(this::verse)
        .collect(Collectors.joining("\n"));
  }

  String sing() {
    return verses(1, 12);
  }
}
