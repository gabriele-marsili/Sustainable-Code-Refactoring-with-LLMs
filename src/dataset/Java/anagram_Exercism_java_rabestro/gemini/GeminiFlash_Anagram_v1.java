import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Anagram {
    private final String sourceWord;
    private final char[] sortedChars;

    Anagram(final String word) {
        sourceWord = word.toLowerCase();
        char[] chars = sourceWord.toCharArray();
        Arrays.sort(chars);
        sortedChars = chars;
    }

    List<String> match(final List<String> possibleAnagrams) {
        List<String> anagrams = new ArrayList<>();
        for (String candidate : possibleAnagrams) {
            if (isAnagram(candidate)) {
                anagrams.add(candidate);
            }
        }
        return List.copyOf(anagrams);
    }

    private boolean isAnagram(final String otherWord) {
        if (sourceWord.length() != otherWord.length()) {
            return false;
        }

        String lowerOtherWord = otherWord.toLowerCase();
        if (sourceWord.equals(lowerOtherWord)) {
            return false;
        }

        char[] otherSortedChars = lowerOtherWord.toCharArray();
        Arrays.sort(otherSortedChars);

        return Arrays.equals(sortedChars, otherSortedChars);
    }
}