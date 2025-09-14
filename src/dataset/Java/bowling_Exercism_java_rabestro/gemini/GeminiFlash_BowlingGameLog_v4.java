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
        if (pinsRemaining == MAX_PINS) {
            firstThrowNumber[frame] = throwNumber;
        }
    }

    void recordThrow(int pins) {
        knockedDownPins[throwNumber++] = pins;
        pinsRemaining -= pins;
        if (pinsRemaining < 0) pinsRemaining = 0;

        if (pins == MAX_PINS || throwNumber - firstThrowNumber[frame] == MAX_THROWS_PER_FRAME) {
            pinsRemaining = MAX_PINS;
            if (frame < MAX_FRAMES - 1) {
                frame++;
            }
        }
    }

    public int score(int frameIndex) {
        int i = firstThrowNumber[frameIndex];
        int score = knockedDownPins[i];
        if (score == MAX_PINS) {
            score += knockedDownPins[i + 1] + knockedDownPins[i + 2];
        } else {
            score += knockedDownPins[i + 1];
            if (knockedDownPins[i] + knockedDownPins[i + 1] == MAX_PINS) {
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

    boolean isGameOver() {
        return frame == MAX_FRAMES && (knockedDownPins[throwNumber - 2] < MAX_PINS && knockedDownPins[throwNumber - 2] + knockedDownPins[throwNumber - 1] < MAX_PINS)
                || (frame == MAX_FRAMES && knockedDownPins[throwNumber - 2] == MAX_PINS)
                || (frame == MAX_FRAMES + 1);
    }
}