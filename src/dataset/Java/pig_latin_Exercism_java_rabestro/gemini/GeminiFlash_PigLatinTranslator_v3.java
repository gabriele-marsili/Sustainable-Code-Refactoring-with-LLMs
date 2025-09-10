import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class PigLatinTranslator {

    private static final Pattern WORD_PATTERN = Pattern.compile(
            "(?<consonants>(?!xr|yt)y?(qu|[\\w&&[^aeiouy]])*)?(?<base>\\w+)",
            Pattern.COMMENTS);
    private static final String AY = "ay";

    public String translate(String sentence) {
        StringBuilder result = new StringBuilder();
        Matcher matcher = WORD_PATTERN.matcher(sentence);
        int lastEnd = 0;

        while (matcher.find()) {
            result.append(sentence, lastEnd, matcher.start());

            String consonants = matcher.group("consonants");
            String base = matcher.group("base");

            if (consonants == null) {
                result.append(base).append(AY);
            } else {
                result.append(base).append(consonants).append(AY);
            }

            lastEnd = matcher.end();
        }

        result.append(sentence.substring(lastEnd));
        return result.toString();
    }
}