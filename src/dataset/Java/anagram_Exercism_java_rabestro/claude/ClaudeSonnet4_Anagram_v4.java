import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Anagram {
    private final int[] sortedChars;
    private final String sourceWord;
    private final String sourceLower;

    Anagram(final String word) {
        sourceWord = word;
        sourceLower = word.toLowerCase();
        sortedChars = toSortedChars(sourceLower);
    }

    List<String> match(final List<String> possibleAnagrams) {
        final List<String> result = new ArrayList<>();
        for (final String candidate : possibleAnagrams) {
            if (isAnagram(candidate)) {
                result.add(candidate);
            }
        }
        return result;
    }

    private boolean isAnagram(final String otherWord) {
        if (sourceLower.equals(otherWord.toLowerCase())) {
            return false;
        }
        return Arrays.equals(sortedChars, toSortedChars(otherWord.toLowerCase()));
    }

    private int[] toSortedChars(final String word) {
        final int[] chars = new int[word.length()];
        for (int i = 0; i < word.length(); i++) {
            chars[i] = word.charAt(i);
        }
        Arrays.sort(chars);
        return chars;
    }
}