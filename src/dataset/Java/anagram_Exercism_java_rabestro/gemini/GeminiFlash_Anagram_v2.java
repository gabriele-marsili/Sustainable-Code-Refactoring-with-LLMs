import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class Anagram {
    private final String sourceWordLower;
    private final char[] sortedChars;

    Anagram(final String word) {
        sourceWordLower = word.toLowerCase();
        sortedChars = sourceWordLower.toCharArray();
        Arrays.sort(sortedChars);
    }

    List<String> match(final List<String> possibleAnagrams) {
        return possibleAnagrams.stream()
                .filter(this::isAnagram)
                .collect(Collectors.toUnmodifiableList());
    }

    private boolean isAnagram(final String otherWord) {
        if (sourceWordLower.length() != otherWord.length()) {
            return false;
        }

        String otherWordLower = otherWord.toLowerCase();

        if (sourceWordLower.equals(otherWordLower)) {
            return false;
        }

        char[] otherSortedChars = otherWordLower.toCharArray();
        Arrays.sort(otherSortedChars);

        return Arrays.equals(sortedChars, otherSortedChars);
    }
}