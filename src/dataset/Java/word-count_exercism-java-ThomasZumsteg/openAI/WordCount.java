import java.util.HashMap;
import java.util.Map;

public class WordCount {
    public Map<String, Integer> phrase(String sentence) {
        Map<String, Integer> wordCounts = new HashMap<>();
        for (String word : sentence.toLowerCase().replaceAll("[^a-z0-9 ]", "").split("\\s+")) {
            wordCounts.merge(word, 1, Integer::sum);
        }
        return wordCounts;
    }
}