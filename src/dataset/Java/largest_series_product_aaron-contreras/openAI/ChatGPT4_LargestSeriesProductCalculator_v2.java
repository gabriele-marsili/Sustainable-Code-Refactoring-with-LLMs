class LargestSeriesProductCalculator {
    private final String series;

    LargestSeriesProductCalculator(String inputNumber) throws IllegalArgumentException {
        if (!inputNumber.matches("\\d*")) {
            throw new IllegalArgumentException("String to search may only contain digits.");
        }
        series = inputNumber;
    }

    long calculateLargestProductForSeriesLength(int numberOfDigits) throws IllegalArgumentException {
        if (numberOfDigits < 0) {
            throw new IllegalArgumentException("Series length must be non-negative.");
        }
        if (numberOfDigits > series.length()) {
            throw new IllegalArgumentException("Series length must be less than or equal to the length of the string to search.");
        }
        if (series.isEmpty() || numberOfDigits == 0) {
            return 1;
        }

        long highestProduct = 0;
        long currProduct = 1;
        int zeroCount = 0;

        for (int i = 0; i < series.length(); i++) {
            int digit = series.charAt(i) - '0';

            if (digit == 0) {
                zeroCount++;
            } else {
                currProduct *= digit;
            }

            if (i >= numberOfDigits) {
                int leftDigit = series.charAt(i - numberOfDigits) - '0';
                if (leftDigit == 0) {
                    zeroCount--;
                } else {
                    currProduct /= leftDigit;
                }
            }

            if (zeroCount == 0 && i >= numberOfDigits - 1) {
                highestProduct = Math.max(highestProduct, currProduct);
            }
        }

        return highestProduct;
    }
}