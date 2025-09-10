import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.HashMap;

public final class PhoneNumber {
    private static final Map<Pattern, String> ERRORS;

    static {
        ERRORS = new HashMap<>();
        ERRORS.put(Pattern.compile(".*\\p{Alpha}.*"), "letters not permitted");
        ERRORS.put(Pattern.compile(".*[@:!].*"), "punctuations not permitted");
        ERRORS.put(Pattern.compile("\\d{12,}"), "must not be greater than 11 digits");
        ERRORS.put(Pattern.compile("\\d{0,9}"), "must not be fewer than 10 digits");
        ERRORS.put(Pattern.compile("[^1]\\d{10}"), "11 digits must start with 1");
        ERRORS.put(Pattern.compile("1?0\\d{9}"), "area code cannot start with zero");
        ERRORS.put(Pattern.compile("1?1\\d{9}"), "area code cannot start with one");
        ERRORS.put(Pattern.compile("1?\\d{3}0\\d{6}"), "exchange code cannot start with zero");
        ERRORS.put(Pattern.compile("1?\\d{3}1\\d{6}"), "exchange code cannot start with one");
        ERRORS.put(Pattern.compile("\\D*"), "non-digits not permitted"); // Added to pre-validate non-digits
        ERRORS.replaceAll((k, v) -> v); // Avoids creating a new map
    }

    private final String number;

    public PhoneNumber(String number) {
        String digits = number.replaceAll("[^\\d]", "");

        if (digits.length() > 11 || digits.length() < 10) {
            throw new IllegalArgumentException(digits.length() > 11 ? "must not be greater than 11 digits" : "must not be fewer than 10 digits");
        }

        if (digits.length() == 11) {
            if (digits.charAt(0) != '1') {
                throw new IllegalArgumentException("11 digits must start with 1");
            }
            digits = digits.substring(1);
        }

        if (digits.startsWith("0")) {
            throw new IllegalArgumentException("area code cannot start with zero");
        }
        if (digits.startsWith("1")) {
            throw new IllegalArgumentException("area code cannot start with one");
        }
        if (digits.charAt(3) == '0') {
            throw new IllegalArgumentException("exchange code cannot start with zero");
        }
        if (digits.charAt(3) == '1') {
            throw new IllegalArgumentException("exchange code cannot start with one");
        }

        this.number = digits;
    }

    public String getNumber() {
        return number;
    }
}