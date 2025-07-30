public final class Say {
    public static final long MAXIMUM_PRONOUNCEABLE_NUMBER = 999_999_999_999L;
    public static final long HUNDRED = 100;
    public static final long THOUSAND = 1_000;
    public static final long MILLION = 1_000_000;
    public static final long BILLION = 1_000_000_000;

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
        return switch ((int) number) {
            case 0 -> "zero";
            case 1 -> "one";
            case 2 -> "two";
            case 3 -> "three";
            case 4 -> "four";
            case 5 -> "five";
            case 6 -> "six";
            case 7 -> "seven";
            case 8 -> "eight";
            case 9 -> "nine";
            case 10 -> "ten";
            case 11 -> "eleven";
            case 12 -> "twelve";
            case 13 -> "thirteen";
            case 14 -> "fourteen";
            case 15 -> "fifteen";
            case 16 -> "sixteen";
            case 17 -> "seventeen";
            case 18 -> "eighteen";
            case 19 -> "nineteen";
            case 20 -> "twenty";
            case 30 -> "thirty";
            case 40 -> "forty";
            case 50 -> "fifty";
            case 60 -> "sixty";
            case 70 -> "seventy";
            case 80 -> "eighty";
            case 90 -> "ninety";
            default -> {
                if (number < HUNDRED) yield sayNumber(number / 10 * 10) + "-" + sayNumber(number % 10);
                if (number < THOUSAND) yield sayMagnitude(number, HUNDRED, "hundred");
                if (number < MILLION) yield sayMagnitude(number, THOUSAND, "thousand");
                if (number < BILLION) yield sayMagnitude(number, MILLION, "million");
                yield sayMagnitude(number, BILLION, "billion");
            }
        };
    }

    private String sayMagnitude(long number, long divisor, String name) {
        var quotientPart = sayNumber(number / divisor) + " " + name;
        var remainder = number % divisor;
        return remainder == 0 ? quotientPart : quotientPart + " " + sayNumber(remainder);
    }
}
