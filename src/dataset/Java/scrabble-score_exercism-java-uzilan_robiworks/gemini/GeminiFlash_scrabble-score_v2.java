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

    private int getWordScore(String word) {
        if (word == null || word.isEmpty()) {
            return 0;
        }

        int score = 0;
        String lowerCaseWord = word.toLowerCase();
        for (int i = 0; i < lowerCaseWord.length(); i++) {
            char c = lowerCaseWord.charAt(i);
            if (c >= 'a' && c <= 'z') {
                score += LETTER_SCORES[c - 'a'];
            }
        }
        return score;
    }
}