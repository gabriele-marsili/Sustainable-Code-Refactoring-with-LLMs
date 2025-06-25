import java.util.HashMap;
import java.util.Map;

class WordCount {
    public Map<String, Integer> phrase(String input) {
        input = input.replaceAll("[,\n:!&@$%^.]", " ");
        input = input.toLowerCase();
        input = input.trim();

        Map<String, Integer> result = new HashMap<>();
        String[] words = input.split("\s+");
        for (String key : words) {
            if (key.charAt(0) == '\'' && key.charAt(key.length() - 1) == '\'') {
                key = key.substring(1, key.length() - 1);
            }

            if (result.containsKey(key)) {
                var value = result.get(key);
                result.put(key, ++value);
            } else {
                result.put(key, 1);
            }
        }
        return result;
    }
}
