import java.util.stream.IntStream;

import static java.util.stream.Collectors.joining;

class BottleSong {
    private static final String[] NUMBERS = {
        "no", "one", "two", "three", "four", "five", 
        "six", "seven", "eight", "nine", "ten"
    };
    
    private static final String[] CAPITALIZED_NUMBERS = {
        "No", "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine", "Ten"
    };

    private String formatBottles(int count, boolean capitalize) {
        if (count == 0) {
            return capitalize ? "No green bottles" : "no green bottles";
        } else if (count == 1) {
            return capitalize ? "One green bottle" : "one green bottle";
        } else {
            String number = capitalize ? CAPITALIZED_NUMBERS[count] : NUMBERS[count];
            return number + " green bottles";
        }
    }

    private String verse(int bottles) {
        String bottleText = formatBottles(bottles, true);
        String remainingBottles = formatBottles(bottles - 1, false);
        
        return bottleText + " hanging on the wall,\n" +
               bottleText + " hanging on the wall,\n" +
               "And if one green bottle should accidentally fall,\n" +
               "There'll be " + remainingBottles + " hanging on the wall.\n";
    }

    String recite(int startBottles, int takeDown) {
        return IntStream.iterate(startBottles, bottles -> bottles - 1)
                .limit(takeDown)
                .mapToObj(this::verse)
                .collect(joining(System.lineSeparator()));
    }
}