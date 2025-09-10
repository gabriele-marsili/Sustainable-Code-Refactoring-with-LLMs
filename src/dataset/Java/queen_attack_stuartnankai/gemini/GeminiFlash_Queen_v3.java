public class Queen {
    int x, y;

    public Queen(int x, int y) throws IllegalArgumentException {
        if (x > 7) {
            throw new IllegalArgumentException("Queen position must have row <= 7.");
        }
        if (y > 7) {
            throw new IllegalArgumentException("Queen position must have column <= 7.");
        }
        if (x < 0) {
            throw new IllegalArgumentException("Queen position must have positive row.");
        }
        if (y < 0) {
            throw new IllegalArgumentException("Queen position must have positive column.");
        }
        this.x = x;
        this.y = y;
    }
}

class QueenAttackCalculator {
    private final Queen queen1;
    private final Queen queen2;

    public QueenAttackCalculator(Queen queen1, Queen queen2) throws IllegalArgumentException {
        if (queen1 == null || queen2 == null) {
            throw new IllegalArgumentException("You must supply valid positions for both Queens.");
        }
        if (queen1.x == queen2.x && queen1.y == queen2.y) {
            throw new IllegalArgumentException("Queens cannot occupy the same position.");
        }
        this.queen1 = queen1;
        this.queen2 = queen2;
    }

    boolean canQueensAttackOneAnother() {
        return queen1.x == queen2.x || queen1.y == queen2.y || Math.abs(queen1.x - queen2.x) == Math.abs(queen1.y - queen2.y);
    }
}