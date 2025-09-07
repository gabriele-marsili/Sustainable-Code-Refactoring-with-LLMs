class Scrabble {
    private int wordScore;

    private static final int[] LETTER_SCORES = new int[26];

    static {
        "aeioulnrst".chars().forEach(c -> LETTER_SCORES[c - 'a'] = 1);
        "dg".chars().forEach(c -> LETTER_SCORES[c - 'a'] = 2);
        "bcmp".chars().forEach(c -> LETTER_SCORES[c - 'a'] = 3);
        "fhvwy".chars().forEach(c -> LETTER_SCORES[c - 'a'] = 4);
        LETTER_SCORES['k' - 'a'] = 5;
        "jx".chars().forEach(c -> LETTER_SCORES[c - 'a'] = 8);
        "qz".chars().forEach(c -> LETTER_SCORES[c - 'a'] = 10);
    }


    Scrabble(String word) {
        word = word.toLowerCase();
        this.wordScore = getWordScore(word);
    }

    int getScore() {
        return wordScore;
    }

    int getWordScore(String word) {
        int score = 0;
        for (int i = 0; i < word.length(); i++) {
            score += getLetterScore(word.charAt(i));
        }
        return score;
    }

    int getLetterScore(char c) {
        int index = c - 'a';
        if (index >= 0 && index < 26) {
            return LETTER_SCORES[index];
        }
        return 0;
    }

    int getLetterScore(String c) {
        if (c == null || c.isEmpty()) {
            return 0;
        }
        return getLetterScore(c.charAt(0));
    }
}