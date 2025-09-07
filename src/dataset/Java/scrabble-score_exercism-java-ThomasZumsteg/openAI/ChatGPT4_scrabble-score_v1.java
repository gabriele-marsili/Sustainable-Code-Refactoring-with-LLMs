import java.util.Map;

public class Scrabble {
    private final String word;
    private static final Map<Character, Integer> letterScore = new java.util.EnumMap<>(Character.class);

    public Scrabble(String word) {
        this.word = word;
    }

    public int getScore() {
        if (word == null || word.isEmpty()) return 0;

        int score = 0;
        for (char c : word.toUpperCase().toCharArray()) {
            score += letterScore.getOrDefault(c, 0);
        }
        return score;
    }

    private static void mapToScore(String letters, int score) {
        for (char letter : letters.toCharArray()) {
            letterScore.put(letter, score);
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