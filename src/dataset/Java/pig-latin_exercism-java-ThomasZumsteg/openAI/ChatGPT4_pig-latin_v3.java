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

        if (!Y_PATTERN.matcher(input).matches()) {
            var defaultMatch = DEFAULT_PATTERN.matcher(input);
            if (defaultMatch.matches()) {
                return defaultMatch.group(2) + defaultMatch.group(1) + "ay";
            }
        }
        return input + "ay";
    }
}