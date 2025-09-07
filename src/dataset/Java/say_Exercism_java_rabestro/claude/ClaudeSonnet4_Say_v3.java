public final class Say {
    public static final long MAXIMUM_PRONOUNCEABLE_NUMBER = 999_999_999_999L;
    public static final long HUNDRED = 100;
    public static final long THOUSAND = 1_000;
    public static final long MILLION = 1_000_000;
    public static final long BILLION = 1_000_000_000;

    private static final String[] ONES = {
        "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
        "seventeen", "eighteen", "nineteen"
    };

    private static final String[] TENS = {
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    };

    public String say(long number) {
        validateNumber(number);
        return sayNumber(number);
    }

    private void validateNumber(long number) {
        if (number < 0 || number > MAXIMUM_PRONOUNCEABLE_NUMBER) {
            throw new IllegalArgumentException("Number must be between 0 and " + MAXIMUM_PRONOUNCEABLE_NUMBER + ".");
        }
    }

    public String sayNumber(long number) {
        if (number == 0) return "zero";
        if (number < 20) return ONES[(int) number];
        if (number < HUNDRED) {
            int tens = (int) (number / 10);
            int ones = (int) (number % 10);
            return ones == 0 ? TENS[tens] : TENS[tens] + "-" + ONES[ones];
        }
        if (number < THOUSAND) return sayMagnitude(number, HUNDRED, "hundred");
        if (number < MILLION) return sayMagnitude(number, THOUSAND, "thousand");
        if (number < BILLION) return sayMagnitude(number, MILLION, "million");
        return sayMagnitude(number, BILLION, "billion");
    }

    private String sayMagnitude(long number, long divisor, String name) {
        long quotient = number / divisor;
        long remainder = number % divisor;
        String quotientPart = sayNumber(quotient) + " " + name;
        return remainder == 0 ? quotientPart : quotientPart + " " + sayNumber(remainder);
    }
}