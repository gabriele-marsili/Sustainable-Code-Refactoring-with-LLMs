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

    private String getBottleText(int count, boolean capitalized) {
        if (count == 0) {
            return capitalized ? "No green bottles" : "no green bottles";
        } else if (count == 1) {
            return capitalized ? "One green bottle" : "one green bottle";
        } else {
            String number = capitalized ? CAPITALIZED_NUMBERS[count] : NUMBERS[count];
            return number + " green bottles";
        }
    }

    private String verse(int bottles) {
        String firstLine = getBottleText(bottles, true) + " hanging on the wall,\n";
        String secondLine = firstLine;
        String thirdLine = "And if one green bottle should accidentally fall,\n";
        String fourthLine = "There'll be " + getBottleText(bottles - 1, false) + " hanging on the wall.\n";
        
        return firstLine + secondLine + thirdLine + fourthLine;
    }

    String recite(int startBottles, int takeDown) {
        return IntStream.iterate(startBottles, bottles -> bottles - 1)
                .limit(takeDown)
                .mapToObj(this::verse)
                .collect(joining(System.lineSeparator()));
    }
}