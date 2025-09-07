import java.util.HashMap;
import java.util.Map;

class Scrabble {
    private int wordScore;
    private static final Map<Character, Integer> LETTER_SCORES = new HashMap<>();

    static {
        for (char c : "aeioulnrst".toCharArray()) LETTER_SCORES.put(c, 1);
        for (char c : "dg".toCharArray()) LETTER_SCORES.put(c, 2);
        for (char c : "bcmp".toCharArray()) LETTER_SCORES.put(c, 3);
        for (char c : "fhvwy".toCharArray()) LETTER_SCORES.put(c, 4);
        LETTER_SCORES.put('k', 5);
        for (char c : "jx".toCharArray()) LETTER_SCORES.put(c, 8);
        for (char c : "qz".toCharArray()) LETTER_SCORES.put(c, 10);
    }

    Scrabble(String word) {
        this.wordScore = getWordScore(word.toLowerCase());
    }

    int getScore() {
        return wordScore;
    }

    int getWordScore(String word) {
        int score = 0;
        for (int i = 0; i < word.length(); i++) {
            score += LETTER_SCORES.getOrDefault(word.charAt(i), 0);
        }
        return score;
    }

    int getLetterScore(String c) {
        return LETTER_SCORES.getOrDefault(c.charAt(0), 0);
    }
}