public final class Say {
    public static final long MAXIMUM_PRONOUNCEABLE_NUMBER = 999_999_999_999L;
    private static final String[] LESS_THAN_20 = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};
    private static final String[] TENS = {"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"};
    private static final String HUNDRED = "hundred";
    private static final String THOUSAND = "thousand";
    private static final String MILLION = "million";
    private static final String BILLION = "billion";

    public String say(long number) {
        validateNumber(number);
        if (number == 0) {
            return LESS_THAN_20[0];
        }
        return sayNumber(number);
    }

    private void validateNumber(long number) {
        if (number < 0 || number > MAXIMUM_PRONOUNCEABLE_NUMBER) {
            throw new IllegalArgumentException("Number must be between 0 and " + MAXIMUM_PRONOUNCEABLE_NUMBER + ".");
        }
    }

    private String sayNumber(long number) {
        if (number < 20) {
            return LESS_THAN_20[(int) number];
        } else if (number < 100) {
            long ten = number / 10;
            long one = number % 10;
            return TENS[(int) ten] + (one > 0 ? "-" + LESS_THAN_20[(int) one] : "");
        } else if (number < 1000) {
            return sayMagnitude(number, 100, HUNDRED);
        } else if (number < 1000000) {
            return sayMagnitude(number, 1000, THOUSAND);
        } else if (number < 1000000000) {
            return sayMagnitude(number, 1000000, MILLION);
        } else {
            return sayMagnitude(number, 1000000000, BILLION);
        }
    }

    private String sayMagnitude(long number, long divisor, String name) {
        long quotient = number / divisor;
        long remainder = number % divisor;
        String result = sayNumber(quotient) + " " + name;
        if (remainder != 0) {
            result += " " + sayNumber(remainder);
        }
        return result;
    }
}