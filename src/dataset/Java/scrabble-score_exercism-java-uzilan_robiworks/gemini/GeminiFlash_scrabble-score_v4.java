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
        this.wordScore = getWordScore(word);
    }

    int getScore() {
        return wordScore;
    }

    int getWordScore(String word) {
        int score = 0;
        if (word != null) {
            word = word.toLowerCase();
            for (int i = 0; i < word.length(); i++) {
                char c = word.charAt(i);
                if (c >= 'a' && c <= 'z') {
                    score += LETTER_SCORES[c - 'a'];
                }
            }
        }
        return score;
    }

    int getLetterScore(String c) {
        if (c == null || c.isEmpty() || c.length() > 1) {
            return 0;
        }
        char charValue = c.charAt(0);
        if (charValue >= 'a' && charValue <= 'z') {
            return LETTER_SCORES[charValue - 'a'];
        }
        return 0;
    }
}