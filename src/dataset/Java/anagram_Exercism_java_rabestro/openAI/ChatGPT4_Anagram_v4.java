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
                .collect(Collectors.toList());
    }

    private boolean isAnagram(final String otherWord) {
        return !sourceWord.equalsIgnoreCase(otherWord)
                && normalizedSortedWord.equals(normalizeAndSort(otherWord));
    }

    private String normalizeAndSort(final String word) {
        return word.toLowerCase().chars()
                .sorted()
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}