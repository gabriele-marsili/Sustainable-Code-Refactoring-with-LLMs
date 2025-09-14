class BowlingGameLog {
    private static final int MAX_FRAMES = 10;
    private static final int MAX_PINS = 10;
    private static final int MAX_THROWS_PER_FRAME = 2;
    private final int[] firstThrowNumber = new int[MAX_FRAMES];
    private final int[] knockedDownPins = new int[MAX_FRAMES * MAX_THROWS_PER_FRAME + 3]; // Increased size for simplicity
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
        knockedDownPins[throwNumber++] = pins;
        pinsRemaining -= pins;
    }

    public int score(int frameIndex) {
        int i = firstThrowNumber[frameIndex];
        int firstThrow = knockedDownPins[i];
        int score = firstThrow;

        if (firstThrow == MAX_PINS) { // Strike
            score += knockedDownPins[i + 1] + knockedDownPins[i + 2];
        } else {
            int secondThrow = knockedDownPins[i + 1];
            score += secondThrow;
            if (firstThrow + secondThrow == MAX_PINS) { // Spare
                score += knockedDownPins[i + 2];
            }
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
        return frame == 0 || (throwNumber > 0 && (throwNumber - firstThrowNumber[frame - 1] >= MAX_THROWS_PER_FRAME || knockedDownPins[firstThrowNumber[frame - 1]] == MAX_PINS));
    }

    boolean isGameOver() {
        if (frame < MAX_FRAMES) {
            return false;
        }

        if (frame == MAX_FRAMES) {
            int throwsInLastFrame = throwNumber - firstThrowNumber[MAX_FRAMES - 1];
            if (throwsInLastFrame == 1 && knockedDownPins[firstThrowNumber[MAX_FRAMES - 1]] < MAX_PINS) {
                return true;
            }
            if (throwsInLastFrame == 2) {
                return true;
            }
            return false;

        }
        return frame > MAX_FRAMES;
    }

    private int lastTwoThrows() {
        return knockedDownPins[throwNumber - 2] + knockedDownPins[throwNumber - 1];
    }
}