import java.util.Map;

public class Scrabble {
    private final String word;
    private static final Map<Integer, Integer> LETTER_SCORE = Map.ofEntries(
        Map.entry((int) 'A', 1), Map.entry((int) 'E', 1), Map.entry((int) 'I', 1), Map.entry((int) 'O', 1),
        Map.entry((int) 'U', 1), Map.entry((int) 'L', 1), Map.entry((int) 'N', 1), Map.entry((int) 'R', 1),
        Map.entry((int) 'S', 1), Map.entry((int) 'T', 1), Map.entry((int) 'D', 2), Map.entry((int) 'G', 2),
        Map.entry((int) 'B', 3), Map.entry((int) 'C', 3), Map.entry((int) 'M', 3), Map.entry((int) 'P', 3),
        Map.entry((int) 'F', 4), Map.entry((int) 'H', 4), Map.entry((int) 'V', 4), Map.entry((int) 'W', 4),
        Map.entry((int) 'Y', 4), Map.entry((int) 'K', 5), Map.entry((int) 'J', 8), Map.entry((int) 'X', 8),
        Map.entry((int) 'Q', 10), Map.entry((int) 'Z', 10)
    );

    public Scrabble(String word) {
        this.word = word;
    }

    public int getScore() {
        if (word == null || word.isEmpty()) return 0;

        return word.chars()
            .map(c -> LETTER_SCORE.getOrDefault(Character.toUpperCase(c), 0))
            .sum();
    }
}