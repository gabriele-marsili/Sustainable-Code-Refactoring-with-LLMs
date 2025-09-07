import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class Anagram {

    private final String original;
    private final char[] orderedLetters;
    private final int originalLength;

    public Anagram(final String ofWord) {
        this.original = ofWord;
        this.originalLength = ofWord.length();
        this.orderedLetters = transformToOrderedLetters(ofWord);
        Arrays.sort(this.orderedLetters);
    }

    public List<String> match(final List<String> toPossibleWords) {
        return toPossibleWords.stream()
                .filter(this::wordAndOriginalAreSameSize)
                .filter(this::wordIsNotTheSameIgnoringCase)
                .filter(this::orderingTheLettersOfTheWordsGivesTheSameStringThanTheOriginalWordOrdered)
                .collect(toList());
    }

    private char[] transformToOrderedLetters(final String ofWord) {
        return ofWord.toLowerCase().toCharArray();
    }

    private boolean wordIsNotTheSameIgnoringCase(String word) {
        return !word.equalsIgnoreCase(original);
    }

    private boolean wordAndOriginalAreSameSize(String word) {
        return word.length() == originalLength;
    }

    private boolean orderingTheLettersOfTheWordsGivesTheSameStringThanTheOriginalWordOrdered(String word) {
        if (word.length() != originalLength) {
            return false;
        }
        char[] wordChars = transformToOrderedLetters(word);
        Arrays.sort(wordChars);
        return Arrays.equals(wordChars, orderedLetters);
    }
}