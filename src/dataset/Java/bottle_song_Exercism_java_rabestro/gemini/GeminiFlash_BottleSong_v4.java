import java.util.function.IntFunction;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

class BottleSong {

    private static final String[] NUMBER_WORDS = {"no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"};

    private final IntFunction<String> firstHalf = bottles -> {
        String bottleWord = (bottles == 1) ? "bottle" : "bottles";
        String numberWord = (bottles <= 10) ? NUMBER_WORDS[bottles] : String.valueOf(bottles);
        return numberWord + " green " + bottleWord + " hanging on the wall,\n" +
               numberWord + " green " + bottleWord + " hanging on the wall,\n";
    };

    private final IntFunction<String> lastHalf = bottles -> {
        String bottleWord = (bottles == 1) ? "bottle" : "bottles";
        String numberWord = (bottles >= 0 && bottles <= 9) ? NUMBER_WORDS[bottles] : (bottles < 0 ? "no" : String.valueOf(bottles));
        return "And if one green bottle should accidentally fall,\n" +
               "There'll be " + numberWord + " green " + (bottles == 1 ? "bottle" : "bottles") + " hanging on the wall.\n";
    };

    private final IntFunction<String> verse = bottles -> firstHalf.apply(bottles) + lastHalf.apply(bottles - 1);

    String recite(int startBottles, int takeDown) {
        return IntStream.rangeClosed(startBottles - takeDown + 1, startBottles)
                .boxed()
                .sorted((a, b) -> Integer.compare(b, a))
                .map(verse)
                .collect(joining(System.lineSeparator()));
    }
}