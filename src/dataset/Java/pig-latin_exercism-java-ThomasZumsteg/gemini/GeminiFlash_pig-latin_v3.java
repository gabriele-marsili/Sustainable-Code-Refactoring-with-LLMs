import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PigLatin {

    private static final Pattern QU_PATTERN = Pattern.compile("([^aeiouAEIOU]*)qu(.*)");
    private static final Pattern Y_PATTERN = Pattern.compile("^y[^aeiouAEIOU]");
    private static final Pattern VOWEL_PATTERN = Pattern.compile("([^aeiouAEIOU]*)([aeiouAEIOU].*)");

    public static String translate(String input) {
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            result.append(translateWord(words[i]));
            if (i < words.length - 1) {
                result.append(" ");
            }
        }
        return result.toString();
    }

    private static String translateWord(String input) {
        Matcher quMatch = QU_PATTERN.matcher(input);
        if (quMatch.find()) {
            return quMatch.group(2) + quMatch.group(1) + "ay";
        }

        Matcher yMatch = Y_PATTERN.matcher(input);
        if (yMatch.find()) {
            return input + "ay";
        }

        Matcher vowelMatch = VOWEL_PATTERN.matcher(input);
        if (vowelMatch.find()) {
            return vowelMatch.group(2) + vowelMatch.group(1) + "ay";
        }

        return input + "ay";
    }
}