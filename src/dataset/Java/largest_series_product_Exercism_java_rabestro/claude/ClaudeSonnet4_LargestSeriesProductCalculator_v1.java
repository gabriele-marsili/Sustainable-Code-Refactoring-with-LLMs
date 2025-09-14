import java.util.function.Predicate;

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
            digits[i] = input.charAt(i) - '0';
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
        
        for (int start = 0; start <= digits.length - span; start++) {
            long product = 1;
            boolean hasZero = false;
            
            for (int i = start; i < start + span; i++) {
                if (digits[i] == 0) {
                    hasZero = true;
                    break;
                }
                product *= digits[i];
            }
            
            if (!hasZero && product > maxProduct) {
                maxProduct = product;
            }
        }
        
        return maxProduct == 0 ? 0 : maxProduct;
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