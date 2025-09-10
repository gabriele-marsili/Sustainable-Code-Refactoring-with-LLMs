public class Queen {
    private final int x;
    private final int y;

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

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}

class QueenAttackCalculator {
    private final Queen queen1;
    private final Queen queen2;

    public QueenAttackCalculator(Queen queen1, Queen queen2) throws IllegalArgumentException {
        if (queen1 == null || queen2 == null) {
            throw new IllegalArgumentException("You must supply valid positions for both Queens.");
        }
        if (queen1.getX() == queen2.getX() && queen1.getY() == queen2.getY()) {
            throw new IllegalArgumentException("Queens cannot occupy the same position.");
        }
        this.queen1 = queen1;
        this.queen2 = queen2;
    }

    boolean canQueensAttackOneAnother() {
        int x1 = queen1.getX();
        int y1 = queen1.getY();
        int x2 = queen2.getX();
        int y2 = queen2.getY();

        return (x1 == x2) || (y1 == y2) || (Math.abs(x1 - x2) == Math.abs(y1 - y2));
    }
}