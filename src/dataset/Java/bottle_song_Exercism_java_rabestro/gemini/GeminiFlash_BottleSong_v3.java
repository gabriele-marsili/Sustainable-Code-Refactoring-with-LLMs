import java.util.function.IntFunction;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

class BottleSong {

    private static final String[] NUMBER_WORDS = {"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"};

    private String firstHalf(int bottles) {
        String bottleWord = (bottles == 1) ? "" : "s";
        String numberWord = (bottles <= 10) ? NUMBER_WORDS[bottles].substring(0, 1).toUpperCase() + NUMBER_WORDS[bottles].substring(1) : String.valueOf(bottles);
        return numberWord + " green bottle" + bottleWord + " hanging on the wall," + System.lineSeparator() +
               numberWord + " green bottle" + bottleWord + " hanging on the wall,";
    }

    private String lastHalf(int bottles) {
        String nextBottleWord = (bottles == 1) ? "" : "s";
        String nextNumberWord = (bottles >= 0 && bottles <= 10) ? NUMBER_WORDS[bottles] : String.valueOf(bottles);
        return "And if one green bottle should accidentally fall," + System.lineSeparator() +
               "There'll be " + nextNumberWord + " green bottle" + nextBottleWord + " hanging on the wall.";
    }

    private String verse(int bottles) {
        return firstHalf(bottles) + System.lineSeparator() + lastHalf(bottles - 1);
    }

    String recite(int startBottles, int takeDown) {
        return IntStream.rangeClosed(startBottles - takeDown + 1, startBottles)
                .boxed()
                .sorted((a, b) -> Integer.compare(b, a))
                .map(this::verse)
                .collect(joining(System.lineSeparator()));
    }
}