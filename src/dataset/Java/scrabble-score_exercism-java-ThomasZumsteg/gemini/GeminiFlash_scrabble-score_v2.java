import java.util.HashMap;
import java.util.Map;

public class Scrabble {
    private final String word;
    private static final Map<Character, Integer> letterScore = new HashMap<>();

    public Scrabble(String word) {
        this.word = word;
    }

    public int getScore() {
        if (word == null || word.isEmpty()) {
            return 0;
        }

        int score = 0;
        String upperCaseWord = word.toUpperCase();
        for (int i = 0; i < upperCaseWord.length(); i++) {
            score += letterScore.getOrDefault(upperCaseWord.charAt(i), 0);
        }
        return score;
    }

    private static void mapToScore(String letters, Integer score) {
        for (int i = 0; i < letters.length(); i++) {
            letterScore.put(letters.charAt(i), score);
        }
    }

    static {
        mapToScore("AEIOULNRST", 1);
        mapToScore("DG", 2);
        mapToScore("BCMP", 3);
        mapToScore("FHVWY", 4);
        mapToScore("K", 5);
        mapToScore("JX", 8);
        mapToScore("QZ", 10);
    }
}