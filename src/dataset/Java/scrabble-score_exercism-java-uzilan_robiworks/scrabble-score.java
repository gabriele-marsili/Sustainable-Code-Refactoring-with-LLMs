class Scrabble {
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
            score += getLetterScore(word.substring(i, i + 1));
        }
        return score;
    }

    int getLetterScore(String c) {
        if (c.matches("[aeioulnrst]")) {
            return 1;
        } else if (c.matches("[dg]")) {
            return 2;
        } else if (c.matches("[bcmp]")) {
            return 3;
        } else if (c.matches("[fhvwy]")) {
            return 4;
        } else if (c.matches("k")) {
            return 5;
        } else if (c.matches("[jx]")) {
            return 8;
        } else if (c.matches("[qz]")) {
            return 10;
        } else {
            return 0;
        }
    }
}
