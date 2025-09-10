import java.util.regex.Pattern;

public final class PigLatinTranslator {

    private static final Pattern WORD_PATTERN = Pattern.compile(
            "(?:(?!xr|yt)y?(qu|[^aeiouy])*)?(\\w+)"
    );

    public String translate(String sentence) {
        StringBuilder result = new StringBuilder();
        String[] words = sentence.split("\\s+");
        for (String word : words) {
            var matcher = WORD_PATTERN.matcher(word);
            if (matcher.matches()) {
                String consonants = matcher.group(1) == null ? "" : matcher.group(1);
                String base = matcher.group(2);
                result.append(base).append(consonants).append("ay").append(" ");
            }
        }
        return result.toString().trim();
    }
}