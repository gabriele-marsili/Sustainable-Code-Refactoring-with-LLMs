public final class Say {
    public static final long MAXIMUM_PRONOUNCEABLE_NUMBER = 999_999_999_999L;
    private static final String[] SMALL_NUMBERS = {
            "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
            "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    };
    private static final String[] TENS = {
            "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    };
    private static final long HUNDRED = 100;
    private static final long THOUSAND = 1_000;
    private static final long MILLION = 1_000_000;
    private static final long BILLION = 1_000_000_000;

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
        if (number < 20) {
            return SMALL_NUMBERS[(int) number];
        } else if (number < HUNDRED) {
            long ten = number / 10;
            long remainder = number % 10;
            return remainder == 0 ? TENS[(int) ten] : TENS[(int) ten] + "-" + SMALL_NUMBERS[(int) remainder];
        } else if (number < THOUSAND) {
            return sayMagnitude(number, HUNDRED, "hundred");
        } else if (number < MILLION) {
            return sayMagnitude(number, THOUSAND, "thousand");
        } else if (number < BILLION) {
            return sayMagnitude(number, MILLION, "million");
        } else {
            return sayMagnitude(number, BILLION, "billion");
        }
    }

    private String sayMagnitude(long number, long divisor, String name) {
        long quotient = number / divisor;
        long remainder = number % divisor;
        String quotientPart = sayNumber(quotient) + " " + name;
        return remainder == 0 ? quotientPart : quotientPart + " " + sayNumber(remainder);
    }
}