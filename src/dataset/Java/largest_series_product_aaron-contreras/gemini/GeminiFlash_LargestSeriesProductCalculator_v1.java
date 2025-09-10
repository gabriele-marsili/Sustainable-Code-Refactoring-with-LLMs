class LargestSeriesProductCalculator {
    private final String series;

    LargestSeriesProductCalculator(String inputNumber) throws IllegalArgumentException {
        if (!inputNumber.matches("\\d*")) {
            throw new IllegalArgumentException("String to search may only contain digits.");
        }
        this.series = inputNumber;
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

        for (int i = 0; i <= series.length() - numberOfDigits; i++) {
            long currentProduct = 1;
            for (int j = i; j < i + numberOfDigits; j++) {
                currentProduct *= Character.getNumericValue(series.charAt(j));
            }
            highestProduct = Math.max(highestProduct, currentProduct);
        }

        return highestProduct;
    }
}