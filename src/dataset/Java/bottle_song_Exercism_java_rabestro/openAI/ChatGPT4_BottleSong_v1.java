import java.text.MessageFormat;
import java.util.function.IntFunction;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

class BottleSong {
    private final IntFunction<String> firstHalf = bottles -> String.format("""
            %s green bottle%s hanging on the wall,
            %s green bottle%s hanging on the wall,
            """,
            numberToWord(bottles), bottles == 1 ? "" : "s",
            numberToWord(bottles), bottles == 1 ? "" : "s");

    private final IntFunction<String> lastHalf = bottles -> String.format("""
            And if one green bottle should accidentally fall,
            There'll be %s green bottle%s hanging on the wall.
            """,
            bottles == 0 ? "no" : numberToWord(bottles), bottles == 1 ? "" : "s");

    private final IntFunction<String> verse = bottles ->
            firstHalf.apply(bottles) + lastHalf.apply(bottles - 1);

    String recite(int startBottles, int takeDown) {
        return IntStream.range(0, takeDown)
                .mapToObj(i -> verse.apply(startBottles - i))
                .collect(joining(System.lineSeparator()));
    }

    private String numberToWord(int number) {
        return switch (number) {
            case 1 -> "one";
            case 2 -> "two";
            case 3 -> "three";
            case 4 -> "four";
            case 5 -> "five";
            case 6 -> "six";
            case 7 -> "seven";
            case 8 -> "eight";
            case 9 -> "nine";
            case 10 -> "ten";
            default -> String.valueOf(number);
        };
    }
}