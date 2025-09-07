import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Anagram {
    private final int[] sortedChars;
    private final String sourceWord;
    private final String lowerSourceWord;

    Anagram(final String word) {
        sourceWord = word;
        lowerSourceWord = word.toLowerCase();
        sortedChars = toSortedChars(lowerSourceWord);
    }

    List<String> match(final List<String> possibleAnagrams) {
        List<String> result = new ArrayList<>();
        for (String candidate : possibleAnagrams) {
            if (isAnagram(candidate)) {
                result.add(candidate);
            }
        }
        return result;
    }

    private boolean isAnagram(final String otherWord) {
        if (lowerSourceWord.equals(otherWord.toLowerCase()) || 
            otherWord.length() != sourceWord.length()) {
            return false;
        }
        return Arrays.equals(sortedChars, toSortedChars(otherWord.toLowerCase()));
    }

    private int[] toSortedChars(final String word) {
        int[] chars = new int[word.length()];
        for (int i = 0; i < word.length(); i++) {
            chars[i] = word.charAt(i);
        }
        Arrays.sort(chars);
        return chars;
    }
}