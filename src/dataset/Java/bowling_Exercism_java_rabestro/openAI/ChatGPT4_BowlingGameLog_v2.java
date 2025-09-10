class BowlingGameLog {
    private static final int MAX_FRAMES = 10;
    private static final int MAX_PINS = 10;
    private static final int MAX_THROWS_PER_FRAME = 2;
    private final int[] firstThrowNumber = new int[MAX_FRAMES + 2];
    private final int[] knockedDownPins = new int[MAX_FRAMES * MAX_THROWS_PER_FRAME + 1];
    private int frame = -1;
    private int throwNumber = -1;
    private int pinsRemaining;

    int pinsOnLane() {
        return pinsRemaining;
    }

    void prepareThrow() {
        if (isNewFrame()) {
            frame++;
            pinsRemaining = MAX_PINS;
            firstThrowNumber[frame] = ++throwNumber;
        } else {
            throwNumber++;
        }
    }

    void recordThrow(int pins) {
        knockedDownPins[throwNumber] = pins;
        pinsRemaining -= pins;
    }

    public int score(int frame) {
        int i = firstThrowNumber[frame];
        int score = knockedDownPins[i] + knockedDownPins[i + 1];
        if (knockedDownPins[i] == MAX_PINS || score == MAX_PINS) { // Strike or Spare
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
        return frame == -1
               || throwNumber - firstThrowNumber[frame] == MAX_THROWS_PER_FRAME
               || knockedDownPins[firstThrowNumber[frame]] == MAX_PINS;
    }

    boolean isGameOver() {
        if (frame < MAX_FRAMES - 1) return false;
        if (frame == MAX_FRAMES - 1) {
            return throwNumber - firstThrowNumber[frame] == 1 && lastTwoThrows() < MAX_PINS;
        }
        if (frame == MAX_FRAMES) {
            return knockedDownPins[throwNumber - 1] < MAX_PINS;
        }
        return frame > MAX_FRAMES;
    }

    private int lastTwoThrows() {
        return knockedDownPins[throwNumber - 1] + knockedDownPins[throwNumber];
    }
}