class Scrabble {
    private static final int[] LETTER_SCORES = new int[26];
    
    static {
        // a, e, i, o, u, l, n, r, s, t
        LETTER_SCORES[0] = LETTER_SCORES[4] = LETTER_SCORES[8] = LETTER_SCORES[14] = LETTER_SCORES[20] = 1;
        LETTER_SCORES[11] = LETTER_SCORES[13] = LETTER_SCORES[17] = LETTER_SCORES[18] = LETTER_SCORES[19] = 1;
        
        // d, g
        LETTER_SCORES[3] = LETTER_SCORES[6] = 2;
        
        // b, c, m, p
        LETTER_SCORES[1] = LETTER_SCORES[2] = LETTER_SCORES[12] = LETTER_SCORES[15] = 3;
        
        // f, h, v, w, y
        LETTER_SCORES[5] = LETTER_SCORES[7] = LETTER_SCORES[21] = LETTER_SCORES[22] = LETTER_SCORES[24] = 4;
        
        // k
        LETTER_SCORES[10] = 5;
        
        // j, x
        LETTER_SCORES[9] = LETTER_SCORES[23] = 8;
        
        // q, z
        LETTER_SCORES[16] = LETTER_SCORES[25] = 10;
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