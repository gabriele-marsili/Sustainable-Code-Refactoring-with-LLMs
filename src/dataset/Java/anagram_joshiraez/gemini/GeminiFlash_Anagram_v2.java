import java.util.Arrays;
import java.util.List;

public class Anagram {

    private final String original;
    private final char[] orderedLetters;

    public Anagram(final String ofWord) {
        this.original = ofWord;
        this.orderedLetters = transformToOrderedLetters(ofWord);
    }

    public List<String> match(final List<String> toPossibleWords) {
        return toPossibleWords.stream()
                .filter(word -> word.length() == original.length())
                .filter(word -> !word.equalsIgnoreCase(original))
                .filter(this::isAnagram)
                .toList();
    }

    private char[] transformToOrderedLetters(final String ofWord) {
        char[] chars = ofWord.toLowerCase().toCharArray();
        Arrays.sort(chars);
        return chars;
    }

    private boolean isAnagram(String word) {
        char[] wordChars = transformToOrderedLetters(word);
        return Arrays.equals(wordChars, orderedLetters);
    }
}