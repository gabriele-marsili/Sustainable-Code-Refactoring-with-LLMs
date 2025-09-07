import java.util.function.Supplier;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

record Acronym(String phrase) implements Supplier<String> {
    private static final Pattern FIRST_LETTER_PATTERN =
            Pattern.compile("(?<![\\p{Alpha}'])\\p{Alpha}");

    public String get() {
        if (phrase == null || phrase.isEmpty()) {
            return "";
        }
        
        Matcher matcher = FIRST_LETTER_PATTERN.matcher(phrase);
        StringBuilder result = new StringBuilder();
        
        while (matcher.find()) {
            char ch = matcher.group().charAt(0);
            result.append(Character.toUpperCase(ch));
        }
        
        return result.toString();
    }
}