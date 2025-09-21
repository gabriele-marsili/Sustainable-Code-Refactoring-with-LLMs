import java.util.regex.Pattern;

public class PigLatin {
    private static final Pattern QU_PATTERN = Pattern.compile("([^aeio]*qu)(.*)");
    private static final Pattern Y_PATTERN = Pattern.compile("^y[^aeiou]");
    private static final Pattern DEFAULT_PATTERN = Pattern.compile("(.*?)([aeoiu].*)");
    
    public static String translate(String input) {
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < words.length; i++) {
            if (i > 0) {
                result.append(" ");
            }
            result.append(translateWord(words[i]));
        }
        
        return result.toString();
    }

    private static String translateWord(String input) {
        java.util.regex.Matcher quMatch = QU_PATTERN.matcher(input);
        if (quMatch.find()) {
            return quMatch.group(2) + quMatch.group(1) + "ay";
        }

        java.util.regex.Matcher yMatch = Y_PATTERN.matcher(input);
        if (!yMatch.find()) {
            java.util.regex.Matcher defaultMatcher = DEFAULT_PATTERN.matcher(input);
            if (defaultMatcher.find() && !input.equals(defaultMatcher.group(1) + "ay")) {
                return defaultMatcher.group(2) + defaultMatcher.group(1) + "ay";
            }
        }
        
        return input + "ay";
    }
}