import java.util.regex.Pattern;

public class PigLatin {
    private static final Pattern QU_PATTERN = Pattern.compile("([^aeio]*qu)(.*)");
    private static final Pattern Y_PATTERN = Pattern.compile("^y[^aeiou]");
    private static final Pattern DEFAULT_PATTERN = Pattern.compile("(.*?)([aeoiu].*)");

    public static String translate(String input) {
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder();
        for (String word : words) {
            if (result.length() > 0) result.append(" ");
            result.append(translateWord(word));
        }
        return result.toString();
    }

    private static String translateWord(String input) {
        var quMatch = QU_PATTERN.matcher(input);
        if (quMatch.matches()) {
            return quMatch.group(2) + quMatch.group(1) + "ay";
        }

        var yMatch = Y_PATTERN.matcher(input);
        var defaultMatcher = DEFAULT_PATTERN.matcher(input);
        if (!yMatch.matches() && defaultMatcher.matches()) {
            return defaultMatcher.group(2) + defaultMatcher.group(1) + "ay";
        }

        return input + "ay";
    }
}