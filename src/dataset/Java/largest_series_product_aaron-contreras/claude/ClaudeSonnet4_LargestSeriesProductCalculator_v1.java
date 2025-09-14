class LargestSeriesProductCalculator {
    private final int[] digits;

    LargestSeriesProductCalculator(String inputNumber) throws IllegalArgumentException {
        if (inputNumber == null) {
            throw new IllegalArgumentException("String to search may only contain digits.");
        }
        
        digits = new int[inputNumber.length()];
        for (int i = 0; i < inputNumber.length(); i++) {
            char c = inputNumber.charAt(i);
            if (c < '0' || c > '9') {
                throw new IllegalArgumentException("String to search may only contain digits.");
            }
            digits[i] = c - '0';
        }
    }

    long calculateLargestProductForSeriesLength(int numberOfDigits) throws IllegalArgumentException {
        if (numberOfDigits < 0) {
            throw new IllegalArgumentException("Series length must be non-negative.");
        }
        if (numberOfDigits > digits.length) {
            throw new IllegalArgumentException("Series length must be less than or equal to the length of the string to search.");
        }
        if (digits.length == 0 || numberOfDigits == 0) {
            return 1;
        }

        long maxProduct = 0;
        
        for (int i = 0; i <= digits.length - numberOfDigits; i++) {
            long product = 1;
            boolean hasZero = false;
            
            for (int j = i; j < i + numberOfDigits; j++) {
                if (digits[j] == 0) {
                    hasZero = true;
                    break;
                }
                product *= digits[j];
            }
            
            if (!hasZero && product > maxProduct) {
                maxProduct = product;
            }
        }

        return maxProduct;
    }
}