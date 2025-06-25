import java.util.ArrayList;
import java.util.List;

class Anagram {
    private final String word;

    public Anagram(String word) {
        this.word = word.toLowerCase();
    }

    public List<String> match(List<String> candidates) {
        List<String> result = new ArrayList<>();
        for (String candidate : candidates) {
            ArrayList<Character> letters = new ArrayList<>();
            for (int i = 0; i < word.length(); i++) {
                letters.add(word.charAt(i));
            }
            String originalCandidate = candidate;
            candidate = candidate.toLowerCase();
            if (candidate.length() != word.length() || candidate.equals(word)) {
                continue;
            }
            for (int i = 0; i < candidate.length(); i++) {
                int index = letters.indexOf(candidate.charAt(i));
                if (index != -1) {
                    letters.remove(index);
                }
            }
            if (letters.isEmpty()) {
                result.add(originalCandidate);
            }
        }
        return result;
    }

}