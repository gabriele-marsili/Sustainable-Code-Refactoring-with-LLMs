class BowlingGameLog {
    private static final int MAX_FRAMES = 10;
    private static final int MAX_PINS = 10;
    private static final int MAX_THROWS_PER_FRAME = 2;
    private final int[] firstThrowNumber = new int[MAX_FRAMES];
    private final int[] knockedDownPins = new int[MAX_FRAMES * MAX_THROWS_PER_FRAME + 2];
    private int frame = 0;
    private int throwNumber = 0;
    private int pinsRemaining = MAX_PINS;

    int pinsOnLane() {
        return pinsRemaining;
    }

    void prepareThrow() {
        if (isNewFrame()) {
            pinsRemaining = MAX_PINS;
            firstThrowNumber[frame] = throwNumber;
            if (frame < MAX_FRAMES) {
                frame++;
            }
        }
    }

    void recordThrow(int pins) {
        knockedDownPins[throwNumber] = pins;
        pinsRemaining -= pins;
        throwNumber++;
    }

    public int score(int frame) {
        int i = firstThrowNumber[frame];
        int score = knockedDownPins[i];
        boolean isStrike = score == MAX_PINS;
        if (!isStrike) {
            score += knockedDownPins[i + 1];
        }
        boolean isSpare = !isStrike && (knockedDownPins[i] + knockedDownPins[i + 1] == MAX_PINS);

        if (isStrike) {
            score += knockedDownPins[i + 1] + knockedDownPins[i + 2];
        } else if (isSpare) {
            score += knockedDownPins[i + 2];
        }
        return score;
    }

    public int totalScore() {
        int total = 0;
        for (int i = 0; i < MAX_FRAMES; i++) {
            total += score(i);
        }
        return total;
    }

    private boolean isNewFrame() {
        return frame == 0 || throwNumber - firstThrowNumber[frame - 1] >= MAX_THROWS_PER_FRAME
               || (frame > 0 && knockedDownPins[firstThrowNumber[frame - 1]] == MAX_PINS);
    }

    boolean isGameOver() {
        if (frame < MAX_FRAMES) {
            return false;
        }

        if (frame == MAX_FRAMES) {
            int throwsInLastFrame = throwNumber - firstThrowNumber[MAX_FRAMES - 1];
            if (throwsInLastFrame < 2) {
                return false;
            }
            if (knockedDownPins[firstThrowNumber[MAX_FRAMES - 1]] < MAX_PINS &&
                knockedDownPins[firstThrowNumber[MAX_FRAMES - 1]] + knockedDownPins[firstThrowNumber[MAX_FRAMES - 1] + 1] < MAX_PINS) {
                return true;
            }
            return throwsInLastFrame == 3;
        }

        return frame > MAX_FRAMES;
    }

    private int lastTwoThrows() {
        return knockedDownPins[throwNumber - 2] + knockedDownPins[throwNumber - 1];
    }
}