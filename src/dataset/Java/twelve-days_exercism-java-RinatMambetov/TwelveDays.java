class TwelveDays {
    private final String[] numbers = {"first", "second", "third", "fourth", "fifth"
            , "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"};
    private final String[] phrases = {"a Partridge in a Pear Tree.\n", "two Turtle Doves, ", "three French Hens, "
            , "four Calling Birds, ", "five Gold Rings, ", "six Geese-a-Laying, ", "seven Swans-a-Swimming, "
            , "eight Maids-a-Milking, ", "nine Ladies Dancing, ", "ten Lords-a-Leaping, ", "eleven Pipers Piping, "
            , "twelve Drummers Drumming, "};

    String verse(int verseNumber) {
        String startText = "On the %s day of Christmas my true love gave to me: ";
        StringBuilder result = new StringBuilder(String.format(startText, numbers[verseNumber - 1]));
        for (int i = verseNumber - 1; i > 0; i--) {
            result.append(phrases[i]);
        }
        if (verseNumber > 1) {
            result.append("and ");
        }
        result.append(phrases[0]);
        return result.toString();
    }

    String verses(int startVerse, int endVerse) {
        StringBuilder result = new StringBuilder();
        for (int line = startVerse; line <= endVerse; line++) {
            result.append(verse(line));
            result.append("\n");
        }
        result.deleteCharAt(result.length() - 1);
        return result.toString();
    }

    String sing() {
        return verses(1, numbers.length);
    }
}
