import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.HashMap;

public final class PhoneNumber {
    private static final Map<Pattern, String> ERRORS;

    static {
        Map<Pattern, String> errors = new HashMap<>();
        errors.put(Pattern.compile(".*\\p{Alpha}.*"), "letters not permitted");
        errors.put(Pattern.compile(".*[@:!].*"), "punctuations not permitted");
        errors.put(Pattern.compile("\\d{12,}"), "must not be greater than 11 digits");
        errors.put(Pattern.compile("\\d{0,9}"), "must not be fewer than 10 digits");
        errors.put(Pattern.compile("[^1]\\d{10}"), "11 digits must start with 1");
        errors.put(Pattern.compile("1?0\\d{9}"), "area code cannot start with zero");
        errors.put(Pattern.compile("1?1\\d{9}"), "area code cannot start with one");
        errors.put(Pattern.compile("1?\\d{3}0\\d{6}"), "exchange code cannot start with zero");
        errors.put(Pattern.compile("1?\\d{3}1\\d{6}"), "exchange code cannot start with one");
        ERRORS = Map.copyOf(errors);
    }

    private final String number;

    public PhoneNumber(String number) {
        String digits = number.replaceAll("[-+.() ]", "");

        if (digits.length() < 10) {
            throw new IllegalArgumentException("must not be fewer than 10 digits");
        }

        if (digits.length() > 11) {
            throw new IllegalArgumentException("must not be greater than 11 digits");
        }

        for (Map.Entry<Pattern, String> error : ERRORS.entrySet()) {
            Pattern pattern = error.getKey();
            Matcher matcher = pattern.matcher(digits);
            if (matcher.matches()) {
                throw new IllegalArgumentException(error.getValue());
            }
        }

        this.number = digits.substring(digits.length() - 10);
    }

    public String getNumber() {
        return number;
    }
}