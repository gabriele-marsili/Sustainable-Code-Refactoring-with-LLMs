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
            if (word.length() == orderedLetters.length() &&
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

    private boolean wordIsNotTheSameIgnoringCase(String word) {
        return !word.equalsIgnoreCase(original);
    }

    private boolean wordAndOriginalAreSameSize(String word) {
        return word.length() == orderedLetters.length();
    }

    private boolean orderingTheLettersOfTheWordsGivesTheSameStringThanTheOriginalWordOrdered(String word) {
        return sortString(word.toLowerCase()).equals(orderedLetters);
    }
}