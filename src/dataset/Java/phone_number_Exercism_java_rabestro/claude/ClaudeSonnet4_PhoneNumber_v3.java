import java.util.regex.Pattern;

public final class PhoneNumber {
    private static final Pattern LETTERS_PATTERN = Pattern.compile(".*\\p{Alpha}.*");
    private static final Pattern PUNCTUATION_PATTERN = Pattern.compile(".*[@:!].*");
    private static final Pattern TOO_LONG_PATTERN = Pattern.compile("\\d{12,}");
    private static final Pattern TOO_SHORT_PATTERN = Pattern.compile("\\d{0,9}");
    private static final Pattern INVALID_11_DIGIT_PATTERN = Pattern.compile("[^1]\\d{10}");
    private static final Pattern AREA_CODE_ZERO_PATTERN = Pattern.compile("1?0\\d{9}");
    private static final Pattern AREA_CODE_ONE_PATTERN = Pattern.compile("1?1\\d{9}");
    private static final Pattern EXCHANGE_CODE_ZERO_PATTERN = Pattern.compile("1?\\d{3}0\\d{6}");
    private static final Pattern EXCHANGE_CODE_ONE_PATTERN = Pattern.compile("1?\\d{3}1\\d{6}");

    private final String number;

    public PhoneNumber(String number) {
        var digits = number.replaceAll("[-+.() ]", "");

        if (LETTERS_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("letters not permitted");
        }
        if (PUNCTUATION_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("punctuations not permitted");
        }
        if (TOO_LONG_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("must not be greater than 11 digits");
        }
        if (TOO_SHORT_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("must not be fewer than 10 digits");
        }
        if (INVALID_11_DIGIT_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("11 digits must start with 1");
        }
        if (AREA_CODE_ZERO_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("area code cannot start with zero");
        }
        if (AREA_CODE_ONE_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("area code cannot start with one");
        }
        if (EXCHANGE_CODE_ZERO_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("exchange code cannot start with zero");
        }
        if (EXCHANGE_CODE_ONE_PATTERN.matcher(digits).matches()) {
            throw new IllegalArgumentException("exchange code cannot start with one");
        }

        this.number = digits.substring(digits.length() - 10);
    }

    public String getNumber() {
        return number;
    }
}