import java.util.function.IntFunction;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

class BottleSong {
    private static final String[] NUMBERS = {
        "no", "One", "Two", "Three", "Four", "Five", 
        "Six", "Seven", "Eight", "Nine", "Ten"
    };
    
    private static final String[] NUMBERS_LOWER = {
        "no", "one", "two", "three", "four", "five", 
        "six", "seven", "eight", "nine", "ten"
    };

    private final IntFunction<String> firstHalf = bottles -> {
        String plural = bottles == 1 ? "" : "s";
        return NUMBERS[bottles] + " green bottle" + plural + " hanging on the wall,\n" +
               NUMBERS[bottles] + " green bottle" + plural + " hanging on the wall,\n";
    };

    private final IntFunction<String> lastHalf = bottles -> {
        String plural = bottles == 1 ? "" : "s";
        return "And if one green bottle should accidentally fall,\n" +
               "There'll be " + NUMBERS_LOWER[bottles] + " green bottle" + plural + " hanging on the wall.\n";
    };

    private final IntFunction<String> verse = bottles ->
            firstHalf.apply(bottles) + lastHalf.apply(bottles - 1);

    String recite(int startBottles, int takeDown) {
        return IntStream.iterate(startBottles, bottles -> bottles - 1)
                .limit(takeDown)
                .mapToObj(verse)
                .collect(joining(System.lineSeparator()));
    }
}