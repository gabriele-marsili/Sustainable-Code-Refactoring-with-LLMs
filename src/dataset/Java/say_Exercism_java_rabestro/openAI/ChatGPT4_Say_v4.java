public final class Say {
    public static final long MAXIMUM_PRONOUNCEABLE_NUMBER = 999_999_999_999L;
    private static final String[] UNITS = {
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
    };
    private static final String[] TEENS = {
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    };
    private static final String[] TENS = {
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    };
    private static final long[] MAGNITUDES = {1_000_000_000, 1_000_000, 1_000, 100};
    private static final String[] MAGNITUDE_NAMES = {"billion", "million", "thousand", "hundred"};

    public String say(long number) {
        if (number < 0 || number > MAXIMUM_PRONOUNCEABLE_NUMBER) {
            throw new IllegalArgumentException("Number must be between 0 and " + MAXIMUM_PRONOUNCEABLE_NUMBER + ".");
        }
        return sayNumber(number);
    }

    private String sayNumber(long number) {
        if (number < 10) return UNITS[(int) number];
        if (number < 20) return TEENS[(int) (number - 10)];
        if (number < 100) {
            return TENS[(int) (number / 10)] + (number % 10 != 0 ? "-" + UNITS[(int) (number % 10)] : "");
        }
        for (int i = 0; i < MAGNITUDES.length; i++) {
            if (number >= MAGNITUDES[i]) {
                long divisor = MAGNITUDES[i];
                String name = MAGNITUDE_NAMES[i];
                long quotient = number / divisor;
                long remainder = number % divisor;
                return sayNumber(quotient) + " " + name + (remainder != 0 ? " " + sayNumber(remainder) : "");
            }
        }
        return "";
    }
}