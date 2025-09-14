import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PigLatin {
    private static final Pattern QU_PATTERN = Pattern.compile("([^aeio]*qu)(.*)");
    private static final Pattern Y_PATTERN = Pattern.compile("^y[^aeiou]");
    private static final Pattern DEFAULT_PATTERN = Pattern.compile("(.*?)([aeoiu].*)");
    private static final String AY = "ay";
    
    public static String translate(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder(input.length() + words.length * 2);
        
        for (int i = 0; i < words.length; i++) {
            if (i > 0) {
                result.append(' ');
            }
            result.append(translateWord(words[i]));
        }
        
        return result.toString();
    }

    private static String translateWord(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        Matcher quMatch = QU_PATTERN.matcher(input);
        if (quMatch.matches()) {
            return quMatch.group(2) + quMatch.group(1) + AY;
        }

        Matcher yMatch = Y_PATTERN.matcher(input);
        if (!yMatch.find()) {
            Matcher defaultMatcher = DEFAULT_PATTERN.matcher(input);
            if (defaultMatcher.matches()) {
                String consonants = defaultMatcher.group(1);
                if (!consonants.isEmpty()) {
                    return defaultMatcher.group(2) + consonants + AY;
                }
            }
        }
        
        return input + AY;
    }
}