import java.util.regex.Pattern;

public final class PigLatinTranslator {

    private static final Pattern WORD_PATTERN = Pattern.compile(
            "(?<consonants>(?!xr|yt)y?(qu|[\\w&&[^aeiouy]])*)?(?<base>\\w+)");
    private static final String PIG_LATIN_FORMAT = "${base}${consonants}ay";

    public String translate(String sentence) {
        return WORD_PATTERN.matcher(sentence).replaceAll(PIG_LATIN_FORMAT);
    }
}