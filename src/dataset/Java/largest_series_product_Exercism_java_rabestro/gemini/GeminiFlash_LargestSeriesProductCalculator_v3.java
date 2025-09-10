import java.util.Arrays;
import java.util.function.IntToLongFunction;
import java.util.function.Predicate;

import static java.util.stream.IntStream.rangeClosed;

class LargestSeriesProductCalculator {
    private static final Predicate<String> ALL_DIGITS = s -> {
        for (int i = 0; i < s.length(); i++) {
            if (!Character.isDigit(s.charAt(i))) {
                return false;
            }
        }
        return true;
    };
    private final int[] digits;

    LargestSeriesProductCalculator(String input) {
        validateInput(input);
        digits = new int[input.length()];
        for (int i = 0; i < input.length(); i++) {
            digits[i] = Character.getNumericValue(input.charAt(i));
        }
    }

    private static void validateInput(String input) {
        if (!ALL_DIGITS.test(input)) {
            throw new IllegalArgumentException("String to search may only contain digits.");
        }
    }

    long calculateLargestProductForSeriesLength(int span) {
        validateSpan(span);
        if (span == 0) {
            return 1;
        }

        long maxProduct = 0;
        for (int i = 0; i <= digits.length - span; i++) {
            long currentProduct = 1;
            for (int j = 0; j < span; j++) {
                currentProduct *= digits[i + j];
            }
            maxProduct = Math.max(maxProduct, currentProduct);
        }

        return maxProduct;
    }


    private void validateSpan(int span) {
        if (span < 0) {
            throw new IllegalArgumentException("Series length must be non-negative.");
        }
        if (span > digits.length) {
            throw new IllegalArgumentException(
                    "Series length must be less than or equal to the length of the string to search.");
        }
    }
}