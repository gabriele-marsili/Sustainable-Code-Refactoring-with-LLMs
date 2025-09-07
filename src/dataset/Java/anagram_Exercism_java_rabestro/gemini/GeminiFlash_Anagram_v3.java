import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class Anagram {
    private final char[] sortedChars;
    private final String sourceWord;
    private final int sourceWordLength;

    Anagram(final String word) {
        sourceWord = word;
        sourceWordLength = word.length();
        sortedChars = toSortedChars(sourceWord);
    }

    List<String> match(final List<String> possibleAnagrams) {
        return possibleAnagrams.stream()
                .filter(this::isAnagram)
                .collect(Collectors.toUnmodifiableList());
    }

    private boolean isAnagram(final String otherWord) {
        if (sourceWordLength != otherWord.length() || sourceWord.equalsIgnoreCase(otherWord)) {
            return false;
        }

        char[] otherSortedChars = toSortedChars(otherWord);
        return Arrays.equals(sortedChars, otherSortedChars);
    }

    private char[] toSortedChars(final String word) {
        char[] chars = word.toLowerCase().toCharArray();
        Arrays.sort(chars);
        return chars;
    }
}