import java.util.stream.IntStream;

class BottleSong {

    private static final String[] NUMBER_WORDS = {"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"};

    private String verse(int bottles) {
        String firstLine = capitalize(numberToWord(bottles)) + " green bottle" + (bottles == 1 ? "" : "s") + " hanging on the wall,\n";
        firstLine = firstLine.repeat(2);

        String secondLine = "And if one green bottle should accidentally fall,\n";
        int remainingBottles = bottles - 1;
        secondLine += "There'll be " + numberToWord(remainingBottles) + " green bottle" + (remainingBottles == 1 ? "" : "s") + " hanging on the wall.";

        return firstLine + secondLine;
    }

    private String numberToWord(int number) {
        if (number >= 0 && number < NUMBER_WORDS.length) {
            return NUMBER_WORDS[number];
        } else {
            return String.valueOf(number); // Handle cases outside the predefined words
        }
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    String recite(int startBottles, int takeDown) {
        StringBuilder song = new StringBuilder();
        for (int i = 0; i < takeDown; i++) {
            int currentBottles = startBottles - i;
            song.append(verse(currentBottles));
            if (i < takeDown - 1) {
                song.append(System.lineSeparator());
            }
        }
        return song.toString();
    }
}