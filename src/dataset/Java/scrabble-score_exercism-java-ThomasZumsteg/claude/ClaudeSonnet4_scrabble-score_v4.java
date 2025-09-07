import java.util.HashMap;

public class Scrabble {
    private final String word;
    private static final int[] letterScore = new int[26];

    public Scrabble(String word) {
        this.word = word;
    }

    public int getScore() {
        if (word == null) return 0;

        int score = 0;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (c >= 'a' && c <= 'z') {
                score += letterScore[c - 'a'];
            } else if (c >= 'A' && c <= 'Z') {
                score += letterScore[c - 'A'];
            }
        }
        return score;
    }

    private static void mapToScore(String letters, int score) {
        for (int i = 0; i < letters.length(); i++) {
            letterScore[letters.charAt(i) - 'A'] = score;
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