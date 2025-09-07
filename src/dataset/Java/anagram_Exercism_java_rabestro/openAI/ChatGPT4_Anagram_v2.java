import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Anagram {
    private final String sortedChars;
    private final String sourceWord;

    Anagram(final String word) {
        sourceWord = word.toLowerCase();
        sortedChars = sortString(sourceWord);
    }

    List<String> match(final List<String> possibleAnagrams) {
        List<String> result = new ArrayList<>();
        for (String candidate : possibleAnagrams) {
            if (isAnagram(candidate)) {
                result.add(candidate);
            }
        }
        return Collections.unmodifiableList(result);
    }

    private boolean isAnagram(final String otherWord) {
        return !sourceWord.equals(otherWord.toLowerCase())
                && sortedChars.equals(sortString(otherWord.toLowerCase()));
    }

    private String sortString(final String word) {
        char[] chars = word.toCharArray();
        java.util.Arrays.sort(chars);
        return new String(chars);
    }
}