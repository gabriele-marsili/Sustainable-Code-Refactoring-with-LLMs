class LargestSeriesProductCalculator {
    String series;

    LargestSeriesProductCalculator(String inputNumber) throws IllegalArgumentException {
        for (int i = 0; i < inputNumber.length(); i++) {
            if (!Character.isDigit(inputNumber.charAt(i))) {
                throw new IllegalArgumentException("String to search may only contain digits.");
            }
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
        
        for (int i = 0; i <= series.length() - numberOfDigits; i++) {
            long currProduct = 1;
            boolean hasZero = false;
            
            for (int j = i; j < i + numberOfDigits; j++) {
                int digit = series.charAt(j) - '0';
                if (digit == 0) {
                    hasZero = true;
                    break;
                }
                currProduct *= digit;
            }
            
            if (!hasZero && currProduct > highestProduct) {
                highestProduct = currProduct;
            }
        }

        return highestProduct;
    }
}