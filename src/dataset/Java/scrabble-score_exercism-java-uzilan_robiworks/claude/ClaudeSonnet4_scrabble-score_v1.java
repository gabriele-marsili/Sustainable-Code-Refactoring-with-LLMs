class Scrabble {
    private static final int[] LETTER_SCORES = new int[26];
    
    static {
        // Initialize letter scores array
        String letters1 = "aeioulnrst";
        String letters2 = "dg";
        String letters3 = "bcmp";
        String letters4 = "fhvwy";
        String letters5 = "k";
        String letters8 = "jx";
        String letters10 = "qz";
        
        for (char c : letters1.toCharArray()) {
            LETTER_SCORES[c - 'a'] = 1;
        }
        for (char c : letters2.toCharArray()) {
            LETTER_SCORES[c - 'a'] = 2;
        }
        for (char c : letters3.toCharArray()) {
            LETTER_SCORES[c - 'a'] = 3;
        }
        for (char c : letters4.toCharArray()) {
            LETTER_SCORES[c - 'a'] = 4;
        }
        for (char c : letters5.toCharArray()) {
            LETTER_SCORES[c - 'a'] = 5;
        }
        for (char c : letters8.toCharArray()) {
            LETTER_SCORES[c - 'a'] = 8;
        }
        for (char c : letters10.toCharArray()) {
            LETTER_SCORES[c - 'a'] = 10;
        }
    }

    private int wordScore;

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