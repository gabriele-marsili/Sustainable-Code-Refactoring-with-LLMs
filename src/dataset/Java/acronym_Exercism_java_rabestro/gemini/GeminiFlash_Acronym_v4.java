import java.util.function.Supplier;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;

record Acronym(String phrase) implements Supplier<String> {
    private static final Pattern FIRST_LETTER_PATTERN =
            Pattern.compile("(?<![\\p{Alpha}'])\\p{Alpha}");

    public String get() {
        StringBuilder acronym = new StringBuilder();
        FIRST_LETTER_PATTERN.matcher(phrase).results().forEach(matchResult -> acronym.append(matchResult.group().toUpperCase()));
        return acronym.toString();
    }
}