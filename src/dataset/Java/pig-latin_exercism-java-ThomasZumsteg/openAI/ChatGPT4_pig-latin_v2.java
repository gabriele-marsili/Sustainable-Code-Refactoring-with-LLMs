import java.util.regex.Pattern;

public class PigLatin {
    private static final Pattern QU_PATTERN = Pattern.compile("([^aeio]*qu)(.*)");
    private static final Pattern Y_PATTERN = Pattern.compile("^y[^aeiou]");
    private static final Pattern DEFAULT_PATTERN = Pattern.compile("(.*?)([aeoiu].*)");

    public static String translate(String input) {
        StringBuilder result = new StringBuilder();
        String[] words = input.split(" ");
        for (String word : words) {
            result.append(translateWord(word)).append(" ");
        }
        return result.toString().trim();
    }

    private static String translateWord(String input) {
        var quMatch = QU_PATTERN.matcher(input);
        if (quMatch.matches()) {
            return quMatch.group(2) + quMatch.group(1) + "ay";
        }

        var yMatch = Y_PATTERN.matcher(input);
        if (!yMatch.matches()) {
            var defaultMatcher = DEFAULT_PATTERN.matcher(input);
            if (defaultMatcher.matches()) {
                return defaultMatcher.group(2) + defaultMatcher.group(1) + "ay";
            }
        }
        return input + "ay";
    }
}