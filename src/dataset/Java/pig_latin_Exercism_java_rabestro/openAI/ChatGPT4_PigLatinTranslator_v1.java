import java.util.regex.Pattern;

public final class PigLatinTranslator {

    private static final Pattern WORD_PATTERN = Pattern.compile(
            "(?:(?!xr|yt)y?(qu|[^aeiouy])*+)?(\\w+)"
    );

    public String translate(String sentence) {
        StringBuilder result = new StringBuilder();
        int lastMatchEnd = 0;

        var matcher = WORD_PATTERN.matcher(sentence);
        while (matcher.find()) {
            result.append(sentence, lastMatchEnd, matcher.start());
            String base = matcher.group(2);
            String consonants = matcher.group(1) == null ? "" : matcher.group(1);
            result.append(base).append(consonants).append("ay");
            lastMatchEnd = matcher.end();
        }
        result.append(sentence.substring(lastMatchEnd));
        return result.toString();
    }
}