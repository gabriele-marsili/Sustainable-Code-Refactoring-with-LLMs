import java.util.regex.Pattern;

public final class PhoneNumber {
    private static final Pattern LETTERS = Pattern.compile(".*\\p{Alpha}.*");
    private static final Pattern PUNCTUATION = Pattern.compile(".*[@:!].*");
    private static final Pattern TOO_LONG = Pattern.compile("\\d{12,}");
    private static final Pattern TOO_SHORT = Pattern.compile("\\d{0,9}");
    private static final Pattern INVALID_COUNTRY = Pattern.compile("[^1]\\d{10}");
    private static final Pattern AREA_ZERO = Pattern.compile("1?0\\d{9}");
    private static final Pattern AREA_ONE = Pattern.compile("1?1\\d{9}");
    private static final Pattern EXCHANGE_ZERO = Pattern.compile("1?\\d{3}0\\d{6}");
    private static final Pattern EXCHANGE_ONE = Pattern.compile("1?\\d{3}1\\d{6}");

    private final String number;

    public PhoneNumber(String number) {
        var digits = number.replaceAll("[-+.() ]", "");

        if (LETTERS.matcher(digits).matches()) {
            throw new IllegalArgumentException("letters not permitted");
        }
        if (PUNCTUATION.matcher(digits).matches()) {
            throw new IllegalArgumentException("punctuations not permitted");
        }
        if (TOO_LONG.matcher(digits).matches()) {
            throw new IllegalArgumentException("must not be greater than 11 digits");
        }
        if (TOO_SHORT.matcher(digits).matches()) {
            throw new IllegalArgumentException("must not be fewer than 10 digits");
        }
        if (INVALID_COUNTRY.matcher(digits).matches()) {
            throw new IllegalArgumentException("11 digits must start with 1");
        }
        if (AREA_ZERO.matcher(digits).matches()) {
            throw new IllegalArgumentException("area code cannot start with zero");
        }
        if (AREA_ONE.matcher(digits).matches()) {
            throw new IllegalArgumentException("area code cannot start with one");
        }
        if (EXCHANGE_ZERO.matcher(digits).matches()) {
            throw new IllegalArgumentException("exchange code cannot start with zero");
        }
        if (EXCHANGE_ONE.matcher(digits).matches()) {
            throw new IllegalArgumentException("exchange code cannot start with one");
        }

        this.number = digits.substring(digits.length() - 10);
    }

    public String getNumber() {
        return number;
    }
}