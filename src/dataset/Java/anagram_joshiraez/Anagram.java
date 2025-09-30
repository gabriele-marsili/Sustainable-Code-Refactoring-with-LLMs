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
            if (wordAndOriginalAreSameSize(word) &&
                wordIsNotTheSameIgnoringCase(word) &&
                orderingTheLettersOfTheWordsGivesTheSameStringThanTheOriginalWordOrdered(word)) {
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
        char[] wordChars = word.toLowerCase().toCharArray();
        Arrays.sort(wordChars);
        return Arrays.equals(wordChars, orderedLetters);
    }
}