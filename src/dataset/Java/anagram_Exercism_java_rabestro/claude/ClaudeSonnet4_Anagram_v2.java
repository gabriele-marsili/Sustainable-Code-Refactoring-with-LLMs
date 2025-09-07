import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Anagram {
    private final int[] sortedChars;
    private final String sourceWordLower;
    private final int sourceLength;

    Anagram(final String word) {
        sourceWordLower = word.toLowerCase();
        sourceLength = word.length();
        sortedChars = toSortedChars(sourceWordLower);
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
        if (otherWord.length() != sourceLength) {
            return false;
        }
        
        String otherLower = otherWord.toLowerCase();
        if (sourceWordLower.equals(otherLower)) {
            return false;
        }
        
        return Arrays.equals(sortedChars, toSortedChars(otherLower));
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