import java.util.Map;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import static java.util.Map.entry;
import static java.util.Map.ofEntries;

public final class PhoneNumber {
    private static final Map<Pattern, String> ERRORS = ofEntries(
                    entry(Pattern.compile(".*\\p{Alpha}.*"), "letters not permitted"),
                    entry(Pattern.compile(".*[@:!].*"), "punctuations not permitted"),
                    entry(Pattern.compile("\\d{12,}"), "must not be greater than 11 digits"),
                    entry(Pattern.compile("\\d{0,9}"), "must not be fewer than 10 digits"),
                    entry(Pattern.compile("[^1]\\d{10}"), "11 digits must start with 1"),
                    entry(Pattern.compile("1?0\\d{9}"), "area code cannot start with zero"),
                    entry(Pattern.compile("1?1\\d{9}"), "area code cannot start with one"),
                    entry(Pattern.compile("1?\\d{3}0\\d{6}"), "exchange code cannot start with zero"),
                    entry(Pattern.compile("1?\\d{3}1\\d{6}"), "exchange code cannot start with one")
            );

    private final String number;

    public PhoneNumber(String number) {
        String digits = number.replaceAll("[-+.() ]", "");
        int len = digits.length();

        for (Map.Entry<Pattern, String> error : ERRORS.entrySet()) {
            Matcher matcher = error.getKey().matcher(digits);
            if (matcher.matches()) {
                throw new IllegalArgumentException(error.getValue());
            }
        }

        if (len > 10) {
            digits = digits.substring(len - 10);
        }

        this.number = digits;
    }

    public String getNumber() {
        return number;
    }
}