import java.util.HashMap;
import java.util.Map;

public class WordCount {
    public Map<String, Integer> phrase(String sentence) {
        Map<String, Integer> wordCounts = new HashMap<>();
        String cleanedSentence = sentence.toLowerCase().replaceAll("[^a-z0-9 ]", "");
        String[] words = cleanedSentence.split("\\s+");

        for (String word : words) {
            if (!word.isEmpty()) {
                wordCounts.compute(word, (k, v) -> (v == null) ? 1 : v + 1);
            }
        }
        return wordCounts;
    }
}