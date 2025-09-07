import java.util.List;
import java.util.stream.Collectors;

class Anagram {
    private final String normalizedSortedWord;
    private final String sourceWord;

    Anagram(final String word) {
        sourceWord = word;
        normalizedSortedWord = normalizeAndSort(word);
    }

    List<String> match(final List<String> possibleAnagrams) {
        return possibleAnagrams.stream()
                .filter(this::isAnagram)
                .collect(Collectors.toUnmodifiableList());
    }

    private boolean isAnagram(final String otherWord) {
        return !sourceWord.equalsIgnoreCase(otherWord)
                && normalizedSortedWord.equals(normalizeAndSort(otherWord));
    }

    private String normalizeAndSort(final String word) {
        char[] chars = word.toLowerCase().toCharArray();
        java.util.Arrays.sort(chars);
        return new String(chars);
    }
}