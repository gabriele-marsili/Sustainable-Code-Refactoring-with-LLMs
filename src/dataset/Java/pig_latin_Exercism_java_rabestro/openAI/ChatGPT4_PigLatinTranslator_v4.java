import java.util.regex.Pattern;

public final class PigLatinTranslator {

    private static final Pattern WORD_PATTERN = Pattern.compile(
        "(?:(?!xr|yt)y?(qu|[^aeiouy])*+)?(\\w++)"
    );
    private static final String PIG_LATIN_FORMAT = "$2$1ay";

    public String translate(String sentence) {
        return WORD_PATTERN.matcher(sentence).replaceAll(PIG_LATIN_FORMAT);
    }
}