import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Anagram {
    private final char[] sortedChars;
    private final String sourceWord;
    private final int sourceWordLength;

    Anagram(final String word) {
        sourceWord = word;
        sourceWordLength = word.length();
        char[] chars = word.toLowerCase().toCharArray();
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
        if (sourceWordLength != otherWord.length() || sourceWord.equalsIgnoreCase(otherWord)) {
            return false;
        }

        char[] otherWordChars = otherWord.toLowerCase().toCharArray();
        Arrays.sort(otherWordChars);

        return Arrays.equals(sortedChars, otherWordChars);
    }
}