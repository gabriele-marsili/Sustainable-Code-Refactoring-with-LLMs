import java.util.function.Predicate;

class LargestSeriesProductCalculator {
    private static final Predicate<String> ALL_DIGITS = s -> s.chars().allMatch(Character::isDigit);
    private final int[] digits;

    LargestSeriesProductCalculator(String input) {
        validateInput(input);
        digits = input.chars().map(c -> c - '0').toArray();
    }

    private static void validateInput(String input) {
        if (!ALL_DIGITS.test(input)) {
            throw new IllegalArgumentException("String to search may only contain digits.");
        }
    }

    long calculateLargestProductForSeriesLength(int span) {
        validateSpan(span);
        if (span == 0) return 1L;

        long maxProduct = 0, currentProduct = 1;
        int zeroCount = 0;

        for (int i = 0; i < digits.length; i++) {
            if (digits[i] == 0) {
                zeroCount++;
            } else {
                currentProduct *= digits[i];
            }

            if (i >= span) {
                if (digits[i - span] == 0) {
                    zeroCount--;
                } else {
                    currentProduct /= digits[i - span];
                }
            }

            if (zeroCount == 0 && i >= span - 1) {
                maxProduct = Math.max(maxProduct, currentProduct);
            }
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