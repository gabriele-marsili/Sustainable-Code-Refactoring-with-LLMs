class LargestSeriesProductCalculator {
    String series;

    LargestSeriesProductCalculator(String inputNumber) throws IllegalArgumentException {
        String tmp = inputNumber.replaceAll("\\D", "");
        if (tmp.length() != inputNumber.length()) {
            throw new IllegalArgumentException("String to search may only contain digits.");
        }
        series = inputNumber;
    }

    long calculateLargestProductForSeriesLength(int numberOfDigits) throws IllegalArgumentException {

        int currProduct = 1;
        int highestProduct = 0;
        
        if (numberOfDigits < 0) {
            throw new IllegalArgumentException("Series length must be non-negative.");
        }
        if (numberOfDigits > series.length()) {
            throw new IllegalArgumentException("Series length must be less than or equal to the length of the string to search.");
        }
        if (series.isEmpty() || numberOfDigits == 0) {
            return 1;
        }
        for (int i = 0; i <= series.length() - numberOfDigits; i++) {
            String workingNumbers = series.substring(i, i+numberOfDigits);
            System.out.println("working numbers" + workingNumbers);
            for (int j = 0; j < workingNumbers.length(); j++) {
                currProduct *= Integer.parseInt(workingNumbers.substring(j, j+1));
            }
            System.out.println("curr product" + currProduct);

            if (currProduct > highestProduct) {
                highestProduct = currProduct;    
            }
            currProduct = 1;
            System.out.println("highest product " + highestProduct);
        }

        return highestProduct;
    }
}
