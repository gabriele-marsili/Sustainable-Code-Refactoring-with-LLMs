import java.util.Map;
import java.util.regex.Pattern;

public final class PhoneNumber {
    private static final Pattern NON_DIGIT_PATTERN = Pattern.compile("[-+.() ]");
    private static final Map<Pattern, String> ERRORS = Map.ofEntries(
            Map.entry(Pattern.compile(".*\\p{Alpha}.*"), "letters not permitted"),
            Map.entry(Pattern.compile(".*[@:!].*"), "punctuations not permitted"),
            Map.entry(Pattern.compile("\\d{12,}"), "must not be greater than 11 digits"),
            Map.entry(Pattern.compile("\\d{0,9}"), "must not be fewer than 10 digits"),
            Map.entry(Pattern.compile("[^1]\\d{10}"), "11 digits must start with 1"),
            Map.entry(Pattern.compile("1?0\\d{9}"), "area code cannot start with zero"),
            Map.entry(Pattern.compile("1?1\\d{9}"), "area code cannot start with one"),
            Map.entry(Pattern.compile("1?\\d{3}0\\d{6}"), "exchange code cannot start with zero"),
            Map.entry(Pattern.compile("1?\\d{3}1\\d{6}"), "exchange code cannot start with one")
    );

    private final String number;

    public PhoneNumber(String number) {
        String digits = NON_DIGIT_PATTERN.matcher(number).replaceAll("");

        for (var error : ERRORS.entrySet()) {
            if (error.getKey().matcher(digits).find()) {
                throw new IllegalArgumentException(error.getValue());
            }
        }
        this.number = digits.substring(digits.length() - 10);
    }

    public String getNumber() {
        return number;
    }
}