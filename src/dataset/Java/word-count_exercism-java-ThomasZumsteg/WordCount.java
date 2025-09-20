import java.util.HashMap;
import java.util.Map;

public class WordCount {
    public Map<String, Integer> phrase(String sentence) {
        if (sentence == null || sentence.isEmpty()) {
            return new HashMap<>();
        }
        
        Map<String, Integer> wordCounts = new HashMap<>();
        String cleaned = sentence.toLowerCase().replaceAll("[^a-z0-9 ]", "");
        
        int start = 0;
        int length = cleaned.length();
        
        while (start < length) {
            // Skip whitespace
            while (start < length && cleaned.charAt(start) == ' ') {
                start++;
            }
            
            if (start >= length) break;
            
            // Find end of word
            int end = start;
            while (end < length && cleaned.charAt(end) != ' ') {
                end++;
            }
            
            String word = cleaned.substring(start, end);
            wordCounts.merge(word, 1, Integer::sum);
            
            start = end;
        }
        
        return wordCounts;
    }
}