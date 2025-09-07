import java.util.HashMap;
import java.util.Map;

public class WordCount {
    public Map<String, Integer> phrase(String sentence) {
        if (sentence == null || sentence.isEmpty()) {
            return new HashMap<>();
        }
        
        Map<String, Integer> wordCounts = new HashMap<>();
        StringBuilder word = new StringBuilder();
        
        for (int i = 0; i < sentence.length(); i++) {
            char c = sentence.charAt(i);
            
            if (Character.isLetterOrDigit(c)) {
                word.append(Character.toLowerCase(c));
            } else if (word.length() > 0) {
                String wordStr = word.toString();
                wordCounts.merge(wordStr, 1, Integer::sum);
                word.setLength(0);
            }
        }
        
        if (word.length() > 0) {
            String wordStr = word.toString();
            wordCounts.merge(wordStr, 1, Integer::sum);
        }
        
        return wordCounts;
    }
}