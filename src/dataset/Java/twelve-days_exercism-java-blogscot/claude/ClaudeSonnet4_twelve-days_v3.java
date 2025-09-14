import java.util.stream.Collectors;
import java.util.stream.IntStream;

class TwelveDays {

  private static final String[] DAYS = {
      "first", "second", "third", "fourth", "fifth", "sixth",
      "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"
  };

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
      "twelve Drummers Drumming"
  };

  private static final String[] CACHED_VERSES = new String[12];
  private static final String CACHED_FULL_SONG;

  static {
    for (int i = 0; i < 12; i++) {
      CACHED_VERSES[i] = buildVerse(i + 1);
    }
    
    StringBuilder fullSong = new StringBuilder(2048);
    for (int i = 0; i < 12; i++) {
      if (i > 0) fullSong.append('\n');
      fullSong.append(CACHED_VERSES[i]);
    }
    CACHED_FULL_SONG = fullSong.toString();
  }

  private static String buildVerse(int verseNumber) {
    StringBuilder verse = new StringBuilder(256);
    verse.append("On the ").append(DAYS[verseNumber - 1])
         .append(" day of Christmas my true love gave to me: ");
    
    if (verseNumber == 1) {
      verse.append(GIFTS[0]);
    } else {
      for (int i = verseNumber - 1; i > 0; i--) {
        verse.append(GIFTS[i]).append(", ");
      }
      verse.append("and ").append(GIFTS[0]);
    }
    
    return verse.append(".\n").toString();
  }

  String verse(int verseNumber) {
    return CACHED_VERSES[verseNumber - 1];
  }

  String verses(int startVerse, int endVerse) {
    if (startVerse == 1 && endVerse == 12) {
      return CACHED_FULL_SONG;
    }
    
    StringBuilder result = new StringBuilder((endVerse - startVerse + 1) * 128);
    for (int i = startVerse; i <= endVerse; i++) {
      if (i > startVerse) result.append('\n');
      result.append(CACHED_VERSES[i - 1]);
    }
    return result.toString();
  }

  String sing() {
    return CACHED_FULL_SONG;
  }
}