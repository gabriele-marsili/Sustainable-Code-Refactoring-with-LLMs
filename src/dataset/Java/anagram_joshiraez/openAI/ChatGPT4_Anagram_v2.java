import java.util.List;
import java.util.ArrayList;

public class Anagram {

    private final String original;
    private final String orderedLetters;

    public Anagram(final String ofWord) {
        this.original = ofWord.toLowerCase();
        this.orderedLetters = sortString(this.original);
    }

    public List<String> match(final List<String> toPossibleWords) {
        List<String> matches = new ArrayList<>();
        for (String word : toPossibleWords) {
            if (word.length() == original.length() &&
                !word.equalsIgnoreCase(original) &&
                sortString(word.toLowerCase()).equals(orderedLetters)) {
                matches.add(word);
            }
        }
        return matches;
    }

    private String sortString(final String input) {
        char[] chars = input.toCharArray();
        java.util.Arrays.sort(chars);
        return new String(chars);
    }
}