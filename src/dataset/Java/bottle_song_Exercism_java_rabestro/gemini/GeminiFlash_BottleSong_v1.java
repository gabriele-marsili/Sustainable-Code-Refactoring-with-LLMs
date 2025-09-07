import java.util.function.IntFunction;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

class BottleSong {

    private static final String[] NUMBER_WORDS = {"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"};

    private String firstHalf(int bottles) {
        String bottleText = (bottles == 1) ? "bottle" : "bottles";
        String numberWord = (bottles >= 0 && bottles <= 10) ? NUMBER_WORDS[bottles] : String.valueOf(bottles); // Handle cases outside 0-10 if needed
        return numberWord.substring(0, 1).toUpperCase() + numberWord.substring(1) + " green " + bottleText + " hanging on the wall,\n";
    }

    private String lastHalf(int bottles) {
        String bottleText = (bottles == 1) ? "bottle" : "bottles";
        String numberWord = (bottles >= 0 && bottles <= 9) ? NUMBER_WORDS[bottles] : String.valueOf(bottles); // Handle cases outside 0-9 if needed

        return "And if one green bottle should accidentally fall,\n" +
                "There'll be " + numberWord + " green " + bottleText + " hanging on the wall.\n";
    }

    private String verse(int bottles) {
        return firstHalf(bottles) + firstHalf(bottles) + lastHalf(bottles - 1);
    }

    String recite(int startBottles, int takeDown) {
        return IntStream.rangeClosed(startBottles - takeDown + 1, startBottles)
                .boxed()
                .sorted((a, b) -> b - a)
                .map(this::verse)
                .collect(joining(System.lineSeparator()));
    }
}