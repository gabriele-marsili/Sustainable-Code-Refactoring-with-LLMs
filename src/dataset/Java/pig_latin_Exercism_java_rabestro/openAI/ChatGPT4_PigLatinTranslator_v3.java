import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.Arrays;

public final class PigLatinTranslator {

    private static final Pattern WORD_PATTERN = Pattern.compile(
            "(?:(?!xr|yt)y?(qu|[^aeiouy])*)(\\w+)"
    );

    public String translate(String sentence) {
        return Arrays.stream(sentence.split("\\s+"))
                .map(word -> WORD_PATTERN.matcher(word).replaceFirst("$2$1ay"))
                .collect(Collectors.joining(" "));
    }
}