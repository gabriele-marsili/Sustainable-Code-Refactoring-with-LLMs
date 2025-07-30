import java.util.function.Supplier;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

record Acronym(String phrase) implements Supplier<String> {
    private static final Pattern FIRST_LETTER_PATTERN =
            Pattern.compile("(?<![\\p{Alpha}'])\\p{Alpha}");

    public String get() {
        return FIRST_LETTER_PATTERN
                .matcher(phrase)
                .results()
                .map(MatchResult::group)
                .collect(Collectors.joining())
                .toUpperCase();
    }
}
