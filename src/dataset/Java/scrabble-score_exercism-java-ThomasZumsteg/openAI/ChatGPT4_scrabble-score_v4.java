import java.util.Map;

public class Scrabble {
    private final String word;
    private static final Map<Character, Integer> LETTER_SCORE = Map.ofEntries(
        Map.entry('A', 1), Map.entry('E', 1), Map.entry('I', 1), Map.entry('O', 1), Map.entry('U', 1),
        Map.entry('L', 1), Map.entry('N', 1), Map.entry('R', 1), Map.entry('S', 1), Map.entry('T', 1),
        Map.entry('D', 2), Map.entry('G', 2),
        Map.entry('B', 3), Map.entry('C', 3), Map.entry('M', 3), Map.entry('P', 3),
        Map.entry('F', 4), Map.entry('H', 4), Map.entry('V', 4), Map.entry('W', 4), Map.entry('Y', 4),
        Map.entry('K', 5),
        Map.entry('J', 8), Map.entry('X', 8),
        Map.entry('Q', 10), Map.entry('Z', 10)
    );

    public Scrabble(String word) {
        this.word = word;
    }

    public int getScore() {
        if (word == null || word.isEmpty()) return 0;

        int score = 0;
        for (char c : word.toUpperCase().toCharArray()) {
            score += LETTER_SCORE.getOrDefault(c, 0);
        }
        return score;
    }
}