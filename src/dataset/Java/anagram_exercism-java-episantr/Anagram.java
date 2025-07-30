import java.util.*;

public class Anagram {

    private final String word;

    public Anagram(String word) {
        this.word = word;
    }

    public List<String> match(List<String> candidates) {
        char[] wordChars = word.toLowerCase(Locale.ENGLISH).toCharArray();
        Arrays.sort(wordChars);
        List<String> matchedList = new ArrayList<>();

        for (String candidate : candidates) {
            char[] candidateChars = candidate.toLowerCase(Locale.ENGLISH).toCharArray();
            Arrays.sort(candidateChars);
            if (!word.equalsIgnoreCase(candidate) && Arrays.equals(wordChars, candidateChars)) {
                matchedList.add(candidate);
            }
        }

        return matchedList;
    }
}