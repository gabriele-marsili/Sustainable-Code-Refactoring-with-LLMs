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
  private static final String cachedSong;

  static {
    // Precompute all verses
    for (int i = 0; i < 12; i++) {
      precomputedVerses[i] = buildVerse(i);
    }
    
    // Precompute the full song
    StringBuilder songBuilder = new StringBuilder(1024);
    for (int i = 0; i < 12; i++) {
      if (i > 0) songBuilder.append('\n');
      songBuilder.append(precomputedVerses[i]);
    }
    cachedSong = songBuilder.toString();
  }

  private static String buildVerse(int dayIndex) {
    StringBuilder sb = new StringBuilder(128);
    sb.append("On the ").append(days[dayIndex]).append(" day of Christmas my true love gave to me: ");
    
    if (dayIndex == 0) {
      sb.append("a Partridge in a Pear Tree");
    } else {
      for (int i = dayIndex; i > 0; i--) {
        sb.append(gifts[i]).append(", ");
      }
      sb.append("a Partridge in a Pear Tree");
    }
    
    sb.append(".\n");
    return sb.toString();
  }

  String verse(int verseNumber) {
    return precomputedVerses[verseNumber - 1];
  }

  String verses(int startVerse, int endVerse) {
    if (startVerse == 1 && endVerse == 12) {
      return cachedSong;
    }
    
    StringBuilder sb = new StringBuilder((endVerse - startVerse + 1) * 100);
    for (int i = startVerse; i <= endVerse; i++) {
      if (i > startVerse) sb.append('\n');
      sb.append(precomputedVerses[i - 1]);
    }
    return sb.toString();
  }

  String sing() {
    return cachedSong;
  }
}