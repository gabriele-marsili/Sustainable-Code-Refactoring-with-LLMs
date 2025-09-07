import java.util.function.Supplier;
import java.util.regex.Pattern;

record Acronym(String phrase) implements Supplier<String> {
    private static final Pattern FIRST_LETTER_PATTERN =
            Pattern.compile("(?<![\\p{Alpha}'])\\p{Alpha}");

    public String get() {
        StringBuilder acronym = new StringBuilder();
        var matcher = FIRST_LETTER_PATTERN.matcher(phrase);
        while (matcher.find()) {
            acronym.append(matcher.group());
        }
        return acronym.toString().toUpperCase();
    }
}