class Scrabble {
    private static final int[] LETTER_SCORES = new int[26];
    
    static {
        String letters = "abcdefghijklmnopqrstuvwxyz";
        int[] scores = {1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10};
        for (int i = 0; i < 26; i++) {
            LETTER_SCORES[i] = scores[i];
        }
    }
    
    private int wordScore;

    Scrabble(String word) {
        this.wordScore = getWordScore(word.toLowerCase());
    }

    int getScore() {
        return wordScore;
    }

    int getWordScore(String word) {
        int score = 0;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (c >= 'a' && c <= 'z') {
                score += LETTER_SCORES[c - 'a'];
            }
        }
        return score;
    }

    int getLetterScore(String c) {
        if (c.length() == 1) {
            char ch = c.charAt(0);
            if (ch >= 'a' && ch <= 'z') {
                return LETTER_SCORES[ch - 'a'];
            }
        }
        return 0;
    }
}