import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Anagram {

    private final String original;
    private final char[] orderedLetters;
    private final int originalLength;

    public Anagram(final String ofWord) {
        this.original = ofWord;
        this.originalLength = ofWord.length();
        this.orderedLetters = transformToOrderedLetters(ofWord);
    }

    public List<String> match(final List<String> toPossibleWords) {
        List<String> result = new ArrayList<>();
        for (String word : toPossibleWords) {
            if (word.length() == originalLength &&
                !word.equalsIgnoreCase(original) &&
                Arrays.equals(transformToOrderedLetters(word), orderedLetters)) {
                result.add(word);
            }
        }
        return result;
    }

    private char[] transformToOrderedLetters(final String ofWord) {
        char[] chars = ofWord.toLowerCase().toCharArray();
        Arrays.sort(chars);
        return chars;
    }
}