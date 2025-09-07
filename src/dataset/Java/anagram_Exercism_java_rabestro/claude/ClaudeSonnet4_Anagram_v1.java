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
        char[] chars = word.toCharArray();
        Arrays.sort(chars);
        int[] result = new int[chars.length];
        for (int i = 0; i < chars.length; i++) {
            result[i] = chars[i];
        }
        return result;
    }
}