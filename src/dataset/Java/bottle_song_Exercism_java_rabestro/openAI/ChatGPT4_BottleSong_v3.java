import java.text.MessageFormat;
import java.util.function.IntFunction;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

class BottleSong {
    private final IntFunction<String> firstHalf = bottles -> {
        String bottleWord = bottles == 1 ? "One" : bottles == 2 ? "Two" : bottles == 3 ? "Three" : bottles == 4 ? "Four" :
                            bottles == 5 ? "Five" : bottles == 6 ? "Six" : bottles == 7 ? "Seven" : bottles == 8 ? "Eight" :
                            bottles == 9 ? "Nine" : "Ten";
        String plural = bottles == 1 ? "" : "s";
        return bottleWord + " green bottle" + plural + " hanging on the wall,\n" +
               bottleWord + " green bottle" + plural + " hanging on the wall,\n";
    };

    private final IntFunction<String> lastHalf = bottles -> {
        String bottleWord = bottles == 0 ? "no" : bottles == 1 ? "one" : bottles == 2 ? "two" : bottles == 3 ? "three" :
                            bottles == 4 ? "four" : bottles == 5 ? "five" : bottles == 6 ? "six" : bottles == 7 ? "seven" :
                            bottles == 8 ? "eight" : "nine";
        String plural = bottles == 1 ? "" : "s";
        return "And if one green bottle should accidentally fall,\n" +
               "There'll be " + bottleWord + " green bottle" + plural + " hanging on the wall.\n";
    };

    private final IntFunction<String> verse = bottles ->
            firstHalf.apply(bottles) + lastHalf.apply(bottles - 1);

    String recite(int startBottles, int takeDown) {
        StringBuilder result = new StringBuilder();
        for (int bottles = startBottles; bottles > startBottles - takeDown; bottles--) {
            result.append(verse.apply(bottles));
            if (bottles > startBottles - takeDown + 1) {
                result.append(System.lineSeparator());
            }
        }
        return result.toString();
    }
}