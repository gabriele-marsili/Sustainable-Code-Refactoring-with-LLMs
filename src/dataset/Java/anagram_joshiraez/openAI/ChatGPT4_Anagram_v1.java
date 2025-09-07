import java.util.List;
import java.util.ArrayList;

public class Anagram {

    private final String original;
    private final String orderedLetters;

    public Anagram(final String ofWord) {
        this.original = ofWord;
        this.orderedLetters = sortString(ofWord.toLowerCase());
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

    private String sortString(final String word) {
        char[] chars = word.toCharArray();
        java.util.Arrays.sort(chars);
        return new String(chars);
    }
}